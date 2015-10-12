/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs-extra'),
  path = require('path'),
  _ = require('underscore'),
  _storagePath = sails.config.storagePath;

function _getExt(filepath) {
  return (/[.]/.exec(filepath)) ? /[^.]+$/.exec(filepath) : null;
}

module.exports = {
  upload: function(req, res, next) {
    var config = req.body;
    var storageDir = '/duraark-storage/sessions/';

    res.setTimeout(0);

    req.file('file').upload({
      maxBytes: 1024 * 1024 * 1024 * 15 // (15GB, which is also set as limit in nginx)
    }, function(err, uploadedFiles) {
      if (err) return res.negotiate(err);

      console.log('uploaded: ' + JSON.stringify(uploadedFiles, null, 4));

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

      var files = [];

      _.forEach(uploadedFiles, function(file) {
        // console.log('uploadedFiles: ' + JSON.stringify(file, null, 4));

        var src = file.fd;
        var target = path.join(storageDir, file.filename);
        var size = fs.statSync(file.fd)['size']; // NOTE: fd.size is wrong in many cases

        // console.log('src: ' + src);
        // console.log('target: ' + target);

        // FIXXME: use Promise.all() to wait for all moves! This is error prone, as it does
        // not wait for the move to be successfully finished before moving on ...
        fs.move(src, target, function(err) {
          if (err) return console.error(err);
        });

        var ext = _getExt(file.fd),
          type = 'unknown';

        if (ext && ext.length) {
          type = ext[0];
          if (type.toLowerCase() === 'ifc') {
            type = 'ifc-spf'
          }
        }

        // console.log('added: ' + target);

        files.push({
          path: target,
          size: size,
          type: type
        });
      });

      return res.send({
        files: files
      }).status(200);

      // Uploads.create(files).exec(function(err, records) {
      //   if (err) return res.negotiate(err);
      //
      //   _.each(records, function(record) {
      //     record.save();
      //   });
      //
      //   return res.send({
      //     files: records
      //   }).status(200);
      // });

      // return res.json({
      //   files: uploadedFiles,
      //   message: uploadedFiles.length + ' file(s) uploaded successfully!',
      // });
    });
  }
};
