var uuid = require('node-uuid'),
  fs = require('fs-extra'),
  path = require('path'),
  Promise = require('bluebird'),
  got = require('got');

var _storagePath = sails.config.storagePath;

function _generateURI(duraarkType) {
  var type = duraarkType.split('/').pop().toLowerCase();
  return 'http://data.duraark.eu/' + type + '_' + uuid.v4();
}

var _baseUrl = process.env.DURAARK_APIENDPOINT || 'http://juliet.cgv.tugraz.at';
// var _baseUrl = 'http://localhost';

module.exports = {
  apiConfig: {
    sessionsUrl: _baseUrl + '/api/v0.7/sessions',
    metadataUrl: _baseUrl + '/api/v0.7/metadata',
    sdaUrl: _baseUrl + '/api/v0.7/sda',
    geometricEnrichmentUrl: _baseUrl + '/api/v0.7/geometricenrichment',
    digitalPreservationUrl: _baseUrl + '/api/v0.7/digitalPreservation'
  },

  getAPIUrl: function(service) {
    return this.apiConfig[service + 'Url'];
  },

  // geoTools: {


  // FIXXME: change to Promise-based implementation!
  createSession: function(res, initialSessionData, startPreprocessing) {
    var controller = this;

    // 1. Create initial session data structure:
    var session = {
      state: "new",
      label: initialSessionData.label || "No label given",
      address: initialSessionData.address || "No address given",
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
    fs.mkdirSync(sessionFolder + '/derivative_copy');
    fs.mkdirSync(sessionFolder + '/sourcemd');
    fs.mkdirSync(sessionFolder + '/tools');
    fs.mkdirSync(sessionFolder + '/tmp');

    session.sessionFolder = sessionFolder;

    console.log('Created session folder at: ' + sessionFolder);

    // The initial session data can contain an array of files which should go into
    // the session. Those files do have to exist in the '/duraark-storage/upload' folder,
    // otherwise an error is returned. Files can be uploaded via the 'files/upload'
    // endpoint, or they can be directly copied there (e.g. our Grasshopper integration
    // is creating sessions with files that way).
    if (!session.files) {
      session.files = [];
    }

    if (initialSessionData.files && initialSessionData.files.length) {
      var fileCounter = 0,
        numFiles = initialSessionData.files.length;

      if (!session.files) {
        session.files = [];
      }

      console.log('numFiles: ' + numFiles);
      if (!numFiles) {
        Sessions.create(session).then(function(sessionRecord) {
          session.url = '/preingest/' + session.id + '/files';
          session.save().then(function(sessionRecord) {
            console.log('Created session: ' + sessionRecord.label);
            console.log('Available in the Workbench at: ' + sessionRecord.url);
            res.send(sessionRecord).status(200);
          });
        }).catch(function(err) {
          console.log('Error0: ' + err);
          res.send(err).status(500);
        });
      }

      _.forEach(initialSessionData.files, function(file) {
        var absFilename = file.path,
          filename = absFilename.split('/').pop();

        console.log('Adding file: ' + absFilename);

        var fileInfo = null;

        try {
          var target = path.join(sessionFolder, 'master', filename);
          fs.move(absFilename, target, function(err) {
            if (err) return res.send('Error: file "' + filename + '" does not exist in "' + _storagePath + '/uploads". Use the "files/upload" endpoint or directly copy the file there before calling this function!\nError: ' + err);

            fileInfo = FileService.getFileStats(target);

            session.files.push(fileInfo);

            fileCounter++;
            // FIXXME: replace with Promise.all() implementation!
            if (fileCounter === numFiles) {
              Sessions.create(session).then(function(sessionRecord) {
                sessionRecord.url = '/preingest/' + session.id + '/files';
                console.log('Created session: ' + sessionRecord.label);
                res.send(sessionRecord).status(200);
              }).catch(function(err) {
                console.log('Error1: ' + err);
                res.send(err).status(500);
              });
            }
          });
        } catch (err) {
          console.log('Error2: ' + err);
          res.send('Error: file "' + filename + '" does not exist in "' + _storagePath + '/uploads". Use the "files/upload" endpoint or directly copy the file there before calling this function!\nError: ' + err);
        }
      });
    } else {
      Sessions.create(session).then(function(sessionRecord) {
        if (startPreprocessing) {
          controller._startPreprocessing(sessionRecord);
        }

        sessionRecord.url = '/preingest/' + sessionRecord.id + '/files';

        sessionRecord.save().then(function(sessionRecord) {
          console.log('Created session: ' + sessionRecord.label);
          console.log('Available in the Workbench at: ' + sessionRecord.url);
          res.send(sessionRecord).status(200);
        });
      }).catch(function(err) {
        console.log('Error3: ' + err);
        res.send(err).status(500);
      });
    }
  },

  deleteSession: function(res, session) {
    // FIXXME: add check if sessionFolder exists!
    fs.rm(session.sessionFolder);

    Sessions.delete(session).then(function() {
      console.log('Deleted session');
      res.send(session).status(200);
    }).catch(function(err) {
      res.send(err).status(500);
    });
  },

  addFilesToSession: function(res, sessionId, files) {
    Sessions.findOne(sessionId).then(function(session) {
      if (!session) {
        res.send('No session with ID ' + sessionId + ' found.').status(500);
      }

      // console.log('session: ' + JSON.stringify(session, null, 4));
      // console.log('files: ' + JSON.stringify(files, null, 4));

      // FIXXME: use Promise.all()!
      var numFiles = files.length,
        fileCounter = 0;

      _.forEach(files, function(file) {
        var filename = file.path.split('/').pop(),
          target = path.join(session.sessionFolder, 'master', filename);

        fs.move(file.path, target, function(err) {
          if (err) {
            res.send('Error adding file ' + file.path + ' to session. Did you upload the file correctly?\n\nDetailes error: ' + err);
          }
          var fileInfo = FileService.getFileStats(target);
          session.files.push(fileInfo);

          console.log('Added file to session: ' + fileInfo.path);

          // TODO: extract metadata already here and trigger potree processing, etc.!

          fileCounter++;

          if (numFiles === fileCounter) {
            session.save().then(function(sessionRecord) {
              res.send(sessionRecord).status(200);
            });
          }
        });
      });

      console.log('sessionFolder: ' + session.sessionFolder);
      // console.log('files: ' + JSON.stringify(files, null, 4));
    });
  },

  extractIfc: function(files, options) {
    var duraark = this;

    console.log('[duraark-sessions] extractIFC from:\n\n' + JSON.stringify(files, null, 4));
    console.log('[duraark-sessions]\n');

    return new Promise(function(resolve, reject) {
      // var geometricEnrichmentUrl = 'http://localhost/api/v0.7/geometricenrichment/pc2bim';
      var geometricEnrichmentUrl = 'http://localhost:5014/pc2bim';
      // var geometricEnrichmentUrl = duraark.getAPIUrl('geometricEnrichment') + '/pc2bim';
      console.log('POST ' + geometricEnrichmentUrl);
      // got.post(geometricEnrichmentUrl, options).then(function(pc2bim) {
      got(geometricEnrichmentUrl).then(function(pc2bim) {
        console.log('asdf: ' + JSON.stringify(pc2bim, null, 4));
        // console.log('pc2bim: ' + Object.keys(pc2bim));
        resolve(pc2bim.body);
      }).catch(function(err) {
        reject(err);
      });
    })
  },

  _startPreprocessing: function(session) {
    // // console.log('[DEBUG] extractIfc' + JSON.stringify(session, null, 4));
    // session.files = [{
    //   label: 'a test',
    //   inputFile: '/gibts/nicht.e57'
    // }];
    //
    // this.extractIfc(session.files).then(function(pc2bim) {
    //   console.log('[duraark-sessions] finished file preprocessing:');
    //   console.log('[duraark-sessions] RESPONSE:\n');
    //   // console.log(JSON.stringify(pc2bim, null, 4));
    //   console.log('\n');
    // }).catch(function(err) {
    //   console.log('[duraark-sessions] file preprocessing FAILED');
    //   console.log('[duraark-sessions] ERROR:\n');
    //   console.log(err);
    //   console.log('\n');
    // });
    // console.log('[duraark-sessions] scheduled preprocessing tasks for "' + session.label + '"');
  }
};
