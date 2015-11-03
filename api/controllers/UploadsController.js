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
  /**
   * @api {post} /uploads/upload Upload file(s)
   * @apiVersion 0.8.0
   * @apiName PostUploadFiles
   * @apiGroup Session
   * @apiPermission none
   *
   * @apiDescription To work with files in a session you have to upload them to the system first. DURAARK provides
   * an upload functionality to do that via this endpoint. A file is first uploaded to the server but is not yet added to
   * a session. To add it to a session use <a href="/#api-Session-addFilesToSession"><strong>Add file(s) to Session</strong></a>.
   * The response from a successful upload can directly be used as input for the
   * <a href="/#api-Session-addFilesToSession"><strong>Add file(s) to Session</strong></a> functionality.
   *
   * @apiExample {curl} Example usage:
   * curl -i -F file=@/tmp/Nygade_Scan1005-1006.ifc http://localhost/api/v0.7/sessions/uploads/upload
   *
   * @apiSuccess {String} path The path where the file is stored after the upload. Use this filepath as reference when adding the file to an
   * existing sessions (see <a href="#api-Session-PostAddFilesToSession">Add file(s) to Session</a>)
   * @apiSuccess {Number} size The file size of the uploaded file.
   * @apiSuccess {String} atime Last access time of the file.
   * @apiSuccess {String} mtime Last modification time of the file.
   * @apiSuccess {String} ctime Creation time of the file.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   * {
   * "files": [{
   *  "path": "/duraark-storage/uploads/upload-3d1d06ac-a5ab-46e6-ab47-dc9e76c1ab75/Nygade_Scan1005-1006.ifc",
   *    "type": "ifc-spf",
   *    "size": 54495,
   *    "atime": "2015-11-03T11:08:24.480Z",
   *    "mtime": "2015-11-03T11:08:24.480Z",
   *    "ctime": "2015-11-03T11:08:24.480Z"
   *  }]
   * }
   */
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
