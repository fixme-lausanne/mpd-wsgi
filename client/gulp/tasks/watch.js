var gulp = require('gulp');
var fs = require('fs');
var onlySaneFiles = require('../util/fileFilter');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
    gulp.watch('src/sass/**', ['compass']);
    gulp.watch('src/images/**', ['images']);
    // Note: The browserify task handles js recompiling with watchify
});
