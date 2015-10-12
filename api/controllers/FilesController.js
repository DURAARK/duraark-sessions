/**
 * FilesController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs'),
  _storagePath = sails.config.storagePath;

function _getExt(filepath) {
  return (/[.]/.exec(filepath)) ? /[^.]+$/.exec(filepath) : null;
}

/**
 * @apiDefine FileParam
 * @apiParam (File) {String} path Location of the File.
 * @apiParam (File) {String} type Type of the File ('e57' or 'ifc-spf').
 * @apiParam (File) {Number} size Size of the File in byte.
 * @apiParam (File) {Boolean} directory True, if a directory, otherwise false.
 * @apiParam (File) {Date} atime Last access time of the File.
 * @apiParam (File) {Date} mtime Last modification time of the File.
 * @apiParam (File) {Date} ctime Creation time of the File.
 * @apiParam (File) {Date} createdAt Creation time of the database instance.
 * @apiParam (File) {Date} updatedAt Last modification time of the database instance.
 * @apiParam (File) {Number} id Database instance's unique ID.
 */

/**
 * @apiDefine FileSuccess
 * @apiSuccess (File) {String} path Location of the File.
 * @apiSuccess (File) {String} type Type of the File ('e57' or 'ifc-spf').
 * @apiSuccess (File) {Number} size Size of the File in byte.
 * @apiSuccess (File) {Boolean} directory True, if a directory, otherwise false.
 * @apiSuccess (File) {Date} atime Last access time of the File.
 * @apiSuccess (File) {Date} mtime Last modification time of the File.
 * @apiSuccess (File) {Date} ctime Creation time of the File.
 * @apiSuccess (File) {Date} createdAt Creation time of the database instance.
 * @apiSuccess (File) {Date} updatedAt Last modification time of the database instance.
 * @apiSuccess (File) {Number} id Database instance's unique ID.
 */

module.exports = {
  /**
   * @api {get} /files/:id Request File
   * @apiVersion 0.7.0
   * @apiName GetFile
   * @apiGroup File
   * @apiPermission none
   *
   * @apiDescription Requests a File stored on the server.
   *
   * @apiParam {Number} id File's unique ID.
   *
   * @apiExample {curl} Example usage:
   * curl -i http://data.duraark.eu/services/api/sessions/files/1
   *
   * @apiUse FileSuccess
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "path": "/duraark-storage/files/Nygade_Scan1001.e57",
   *        "type": "e57",
   *        "size": 270408704,
   *        "directory": false,
   *        "atime": "2015-08-04T19:01:46.000Z",
   *        "mtime": "2015-07-30T16:16:08.000Z",
   *        "ctime": "2015-07-30T16:18:51.000Z",
   *        "createdAt": "2015-08-05T15:20:24.963Z",
   *        "updatedAt": "2015-08-05T15:20:25.005Z",
   *        "id": 1
   *      }
   *
   * @apiError NotFound The File was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     Not Found
   *
   */

  /**
   * @api {post} /files Create File
   * @apiVersion 0.7.0
   * @apiName PostFile
   * @apiGroup File
   * @apiPermission none
   *
   * @apiDescription Creates a new File on the server.
   *
   * @apiUse FileParam
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "path": "/duraark-storage/files/Nygade_Scan1001.e57",
   *        "type": "e57",
   *        "size": 270408704,
   *        "directory": false,
   *        "atime": "2015-08-04T19:01:46.000Z",
   *        "mtime": "2015-07-30T16:16:08.000Z",
   *        "ctime": "2015-07-30T16:18:51.000Z",
   *        "createdAt": "2015-08-05T15:20:24.963Z",
   *        "updatedAt": "2015-08-05T15:20:25.005Z",
   *        "id": 1
   *      }
   *
   * @apiUse FileSuccess
   *
   */

  //  find: function(req, res, next) {
  //    var files = FileService.getFileList({
  //        path: _storagePath
  //    });
  //
  //    _.forEach(files, function(item, idx) {
  //      item.id = idx;
  //    });
  //
  //    res.send(files).status(200);
  //  }

  /**
   * @api {post} /upload Upload file
   * @apiVersion 0.8.0
   * @apiName PostUploadFile
   * @apiGroup File
   * @apiPermission none
   *
   * @apiDescription Upload a new file.
   *
   */
  upload: function(req, res, next) {
    console.log('asdfasdfasdf');
    var config = req.body;
    var storageDir = '/duraark-storage/sessions/a-uuid-number';

    console.log('storageDir: ' + storageDir);

    res.setTimeout(0);

      console.log('1asdfasdfasdf');
    req.file('file').upload({
      saveAs: function(fileStream, cb) {
        console.log('2asdfasdfasdf');
        var outputFile = storageDir + fileStream.filename;
        console.log('Storing file as: ' + outputFile);

        // FIXXME: Handle existing files!
        var writeStream = fs.createWriteStream(outputFile);
        fileStream.pipe(writeStream);

          console.log('3asdfasdfasdf');
        cb(null, outputFile);
      }
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

        var ext = _getExt(file.fd),
          type = 'unknown';

        if (ext && ext.length) {
          type = ext[0];
          if (type.toLowerCase() === 'ifc') {
            type = 'ifc-spf'
          }
        }

        files.push({
          path: file.fd,
          size: file.size,
          directory: false,
          type: type
        });
      });

      Files.create(files).then(function(records) {
        return res.send({
          files: records
        }).status(200);
      });

      // return res.json({
      //   files: uploadedFiles,
      //   message: uploadedFiles.length + ' file(s) uploaded successfully!',
      // });
    });
  }
};
