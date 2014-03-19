'use strict';
var path = require('path');
var gutil = require('gulp-util');
var map = require('map-stream');
var cp = require('child_process');

module.exports = function (options) {

  return map(function (file, cb) {

    cp.exec('php node_modules/gulp-bladephp/bin/blade.phar --cwd='+process.cwd()+' --tmpl='+file.path, function (error, stdout, stderr) {
        var output =  stdout;
        if (error !== null) {
          gutil.log('exec error: ' + error);
        }

        var newFile = new gutil.File({
            cwd: file.cwd,
            base: file.base,
            path: file.path.replace('.blade.php', '.html'),
            contents: new Buffer(output)
        });

        cb(null, newFile);
    });

  });
};
