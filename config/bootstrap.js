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
  fixedSessionsPath = path.join(__dirname, '../fixedSessions.json'),
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
      if (records.length) {
        console.log('\n[bootstrapping] "Session" fixtures cached, skipping creation.\n');
        return;
      } else {
        var exists = false;
        console.log('Looking for fixed session configuration at: ', fixedSessionsPath);

        try {
          fs.statSync(fixedSessionsPath);
          exists = true;
        } catch (err) {
          console.log('No fixed sessions file detected, skipping session creation');
        }

        if (exists) {
          fixedSessions = require(fixedSessionsPath);


          Sessions.create(fixedSessions).then(function(fixedSessions) {
            console.log('   created fixed sessions: ' + fixedSessions.length);
          })
        }
      }
    });
}
