/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */


var _ = require('underscore'),
  fs = require('fs'),
  path = require('path'),
  // FIXXME: make path configurable!
  fixedSessionsPath = path.join(__dirname, '..', 'fixtures', 'sessions'),
  fixedSessions = [];

module.exports.bootstrap = function(cb) {
  initSessions();
  cb();
};

function initSessions() {
  Sessions.find()
    .where({
      id: {
        '>': 0
      }
    })
    .then(function(records) {
      if (false && records.length) {
        console.log('\n[bootstrapping] "Session" fixtures cached, skipping creation.\n');
        return;
      } else {
        console.log('Looking for fixed sessions in: ', fixedSessionsPath);

        try {
          var sessionFiles = FileService.getFileList({
            path: fixedSessionsPath
          });
        } catch (err) {
          console.log('No fixed sessions available, skipping.');
        }

        _.forEach(sessionFiles, function(sessionFile) {
          var session = require(sessionFile.path);

          // console.log('processing files: #', session.files.length);
          _.forEach(session.files, function(file) {
            // console.log('     file: ' + file.path);
            Files.create(file).then(function(fileRecord) {
              file.id = fileRecord.id;
            });
          });

          Sessions.create(session).then(function(sessionRecord) {
            console.log('[init] Added session: ' + sessionRecord.label);
          });
        });
      }
    });
}
