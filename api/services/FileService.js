var fs = require('fs'),
  path = require('path');

function _getExt(filepath) {
  return (/[.]/.exec(filepath)) ? /[^.]+$/.exec(filepath) : null;
}

module.exports = {

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

      filelist.push({
        path: filepath,
        type: type,
        size: stats.size,
        directory: stats.isDirectory(),
        atime: stats.atime,
        mtime: stats.mtime,
        ctime: stats.ctime
      });
    }

    return filelist;
  }
};
