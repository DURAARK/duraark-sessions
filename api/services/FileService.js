var fs = require('fs'),
    path = require('path');

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

            filelist.push({
                path: filepath,
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