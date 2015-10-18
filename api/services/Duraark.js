var uuid = require('node-uuid'),
  fs = require('fs-extra'),
  path = require('path'),
  _storagePath = sails.config.storagePath;

function _generateURI(duraarkType) {
  var type = duraarkType.split('/').pop().toLowerCase();
  return 'http://data.duraark.eu/' + type + '_' + uuid.v4();
}


module.exports = {
  // FIXXME: change to Promise-based implementation!
  createSession: function(res, initialSessionData) {
    // 1. Create initial session data structure:
    var session = {
      state: "new",
      label: initialSessionData.label,
      address: initialSessionData.address,
      description: initialSessionData.description || "No description",
      physicalAssets: [{
        label: initialSessionData.label,
        buildm: {
          '@id': _generateURI('http://data.duraark.eu/vocab/buildm/PhysicalAsset'),
          '@type': 'http://data.duraark.eu/vocab/buildm/PhysicalAsset',
          'http://data.duraark.eu/vocab/buildm/name': [{
            '@value': initialSessionData.label
          }]
        }
      }],
      digitalObjects: [],
      config: {
        sda: {
          topics: [
            "Haus 30 (general context)",
            "Haus 30 (political context)"
          ]
        },
        geometricenrichment: {
          tools: [
            "IFC Reconstruction"
          ]
        }
      }
    }

    // 2. Create a session folder to store master, derivatives and temporary files:
    var sessionFolder = path.join(_storagePath, 'sessions', 'duraark-session-' + uuid.v4());
    fs.mkdirSync(sessionFolder);
    fs.mkdirSync(sessionFolder + '/master');
    fs.mkdirSync(sessionFolder + '/derivatives');
    fs.mkdirSync(sessionFolder + '/tmp');

    console.log('Created session folder at: ' + sessionFolder);

    // The initial session data can contain an array of files which should go into
    // the session. Those files do have to exist in the '/duraark-storage/upload' folder,
    // otherwise an error is returned. Files can be uploaded via the 'files/upload'
    // endpoint, or they can be directly copied there (e.g. our Grasshopper integration
    // is creating sessions with files that way).
    if (initialSessionData.files && initialSessionData.files.length) {
      var fileCounter = 0,
        numFiles = initialSessionData.files.length;

      _.forEach(initialSessionData.files, function(filename) {
        var absFilename = path.join(_storagePath, 'uploads', filename);
        console.log('Adding file: ' + absFilename);

        var fileInfo = null;

        try {
          var target = path.join(sessionFolder, 'master', filename);
          fs.move(absFilename, target, function(err) {
            if (err) return res.send('Error: file "' + filename + '" does not exist in "/duraark-storage/uploads". Use the "files/upload" endpoint or directly copy the file there before calling this function!\nError: ' + err);

            fileInfo = FileService.getFileStats(target);

            if (!session.files) {
              session.files = [];
            }

            session.files.push(fileInfo);
            fileCounter++;

            // FIXXME: replace with Promise.all() implementation!
            if (fileCounter === numFiles) {
              Sessions.create(session).then(function(sessionRecord) {
                console.log('Created session: ' + sessionRecord.label);
                res.send(sessionRecord).status(200);
              }).catch(function(err) {
                res.send(err).status(500);
              });
            }
          });
        } catch (err) {
          res.send('Error: file "' + filename + '" does not exist in "/duraark-storage/uploads". Use the "files/upload" endpoint or directly copy the file there before calling this function!\nError: ' + err);
        }
      });
    }
  }
};
