var browserify   = require('browserify');
var watchify     = require('watchify');
var reactify     = require('reactify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');

gulp.task('browserify', function() {

    var bundleMethod = global.isWatching ? watchify : browserify;

    var bundler = bundleMethod({
	entries: ['./src/js/application.jsx'],
	extensions: ['.js', '.jsx']
    });

    var bundle = function() {
	bundleLogger.start();

        // Compile React's JSX files
        bundler.transform(reactify);

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
