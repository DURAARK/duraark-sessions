var fs = require('fs'),
  path = require('path');

function _getExt(filepath) {
  return (/[.]/.exec(filepath)) ? /[^.]+$/.exec(filepath) : null;
}

module.exports = {

  // NOTE: this function is not used anymore, but left here for reference ...
  // addFileToDatabase: function(file) {
  //   Files.findOne().where({
  //     path: file.path
  //   }).then(function(file) {
  //     if (!file) {
  //       Files.create(file).exec(function(err, file) {
  //         if (err) {
  //           console.log('err create: ' + err);
  //         } else {
  //           file.save(function(err) {
  //             if (err) {
  //               console.log('save err: ' + err);
  //             }
  //             console.log('Added file to database: ' + JSON.stringify(file, null, 4));
  //           });
  //         }
  //       });
  //     }
  //   });
  // },

  getFileList: function(opts) {
    var filelist = [],
      paths = [];

    var pathStrings = fs.readdirSync(opts.path);

    if (!pathStrings) throw new Error('Cannot read directory, error: ' + err);

    for (var idx = 0; idx < pathStrings.length; idx++) {
      var pathString = pathStrings[idx];

      var absPath = path.join(opts.path, pathString);
      paths.push(absPath);
    };

    // TODO: add support for directories!

    for (var idx = 0; idx < paths.length; idx++) {
      var filepath = paths[idx];

      var stats = this.getFileStats(filepath);
      filelist.push(stats);
    }

    return filelist;
  },

  getFileStats: function(filepath) {
    var stats = fs.statSync(filepath);
    if (!stats) {
      throw new Error('Cannot stat file, error: ' + err);
    }

    var ext = _getExt(filepath),
      type = 'unknown';

    if (ext && ext.length) {
      type = ext[0];
      if (type.toLowerCase() === 'ifc') {
        type = 'ifc-spf'
      }
    }

    return {
      path: filepath,
      type: type,
      size: stats.size,
      atime: stats.atime,
      mtime: stats.mtime,
      ctime: stats.ctime
    }
  }
};
