var fs = require('fs'),
  path = require('path'),
  _ = require('underscore');

var _storagePath = sails.config.storagePath;

// FIXXME: not sure if that is the right way to to that. For the moment it does the trick for loading
// files into the database. In future data consistency over multiple restarts and changes of local files
// has to be taken into account!
module.exports = function loadFiles(req, res, next) {
  // Only add files to the database if none exist:
  Files.find()
    .where({
      id: {
        '>': 0
      }
    })
    .then(function(record) {
      // console.log(JSON.stringify(record, null, 4));
      if (!record.length) {
        var files = FileService.getFileList({
          path: _storagePath
        });

        _addToDatabase(files, next);
      } else {
        next();
      }
    });
};

function _addToDatabase(files, next) {
  var fileCounter = 0,
    numFiles = files.length;

  _.forEach(files, function(item) {
    Files.findOne().where({
      path: item.path
    }).then(function(file) {
      if (!file) {
        Files.create(item).exec(function(err, file) {
          if (err) {
            console.log('err create: ' + err);
          } else {
            console.log('added file: ' + JSON.stringify(file, null, 4));

            file.save(function(err) {
              if (err) {
                console.log('save err: ' + err);
              }

              fileCounter++;

              if (fileCounter == numFiles) {
                next();
              }
            });
          }
        });
      }
    });
  });
}
