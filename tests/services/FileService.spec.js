var Sails = require('sails'),
  assert = require('chai').assert,
  path = require('path');

before(function(done) {

  // Lift Sails and start the server
  Sails.lift({

    log: {
      level: 'error'
    },

  }, function(err, sails) {
    app = sails;
    done(err, sails);
  });
});

// Global after hook
after(function(done) {
  app.lower(done);
});

describe('The FileService service', function() {
  // we emulate the default rootPath with a fixture data path here:
  var storagePath = path.join(__dirname, '../fixtures/storage')

  describe('when listing files from the default rootPath', function() {
    it('should return an array', function(done) {

      var fileList = FileService.getFileList({
        path: storagePath
      });

      assert(Array.isArray(fileList), 'returned value is array');
      done();
    });

    it('should return the test file', function(done) {
      var fileList = FileService.getFileList({
        path: storagePath
      });

      assert(fileList[0].path === path.join(storagePath, '/file1.e57'), 'first entry equals path to "file1.e57"');
      done();
    });
  });
});;
