/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs-extra'),
  path = require('path'),
  _ = require('underscore'),
  uuid = require('node-uuid'),
  _storagePath = sails.config.storagePath;

module.exports = {
  upload: function(req, res, next) {
    var uploadDir = path.join(_storagePath, 'uploads', 'upload-' + uuid.v4());

    res.setTimeout(0);

    // var bla = req.file('file');
    // console.log('bla: ' + JSON.stringify(bla, null, 4));

    req.file('file').upload({
      maxBytes: 1024 * 1024 * 1024 * 15 // (15GB, which is also set as limit in nginx)
    }, function(err, uploadedFiles) {
      if (err) return res.negotiate(err);

      // console.log('uploaded: ' + JSON.stringify(uploadedFiles, null, 4));

      var files = []
      numFiles = uploadedFiles.length,
        fileCounter = 0;

      _.forEach(uploadedFiles, function(file) {
        // console.log('uploadedFiles: ' + JSON.stringify(file, null, 4));

        var src = file.fd,
          target = path.join(uploadDir, file.filename);

        // console.log('src: ' + src);
        // console.log('target: ' + target);

        fs.move(src, target, function(err) {
          if (err) res.negotiate(err);

          fileCounter++;

          files.push(FileService.getFileStats(target));

          // FIXXME: use Promise.all() to wait for all moves!
          if (numFiles === fileCounter) {
            console.log('Successfully uploaded files: ' + JSON.stringify(files, null, 4));
            return res.send({
              files: files
            }).status(200);
          }
        });
      });
    });
  }
};

// var files = [{
//   path: "/duraark-storage/files/Nygade_Scan5001.e57",
//   type: "e57",
//   size: 270408704,
//   directory: false,
//   atime: "2015-09-02T15:03:29.000Z",
//   mtime: "2015-08-05T10:42:03.000Z",
//   ctime: "2015-08-05T10:42:03.000Z",
//   createdAt: "2015-09-10T07:29:12.971Z",
//   updatedAt: "2015-09-10T07:29:13.000Z",
//   id: 1
// }, {
//   path: "/duraark-storage/files/Nygade_Scan5751.ifc",
//   type: "ifc",
//   size: 270408704,
//   directory: false,
//   atime: "2015-09-02T15:03:29.000Z",
//   mtime: "2015-08-05T10:42:03.000Z",
//   ctime: "2015-08-05T10:42:03.000Z",
//   createdAt: "2015-09-10T07:29:12.971Z",
//   updatedAt: "2015-09-10T07:29:13.000Z",
//   id: 1
// }];
