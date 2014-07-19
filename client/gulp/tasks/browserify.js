var browserify   = require('browserify');
var watchify     = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');

gulp.task('browserify', function() {

    var bundleMethod = global.isWatching ? watchify : browserify;

    var bundler = bundleMethod({
	entries: ['./src/js/application.js'],
	extensions: ['.js']
    });

    var bundle = function() {
	bundleLogger.start();

	return bundler
            .bundle({debug: false})
	    .on('error', handleErrors)
	    .pipe(source('application.js'))
	    .pipe(gulp.dest('./build/js/'))
	    .on('end', bundleLogger.end);
    };

    if(global.isWatching) {
	bundler.on('update', bundle);
    }

    return bundle();
});
