var gulp = require('gulp');

gulp.task('copyJS', function() {
    return gulp.src('src/lib/modernizr/modernizr.js')
        .pipe(gulp.dest('build/js'));
});

gulp.task('copyFonts', function() {
    return gulp.src('src/lib/font-awesome/fonts/**')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('copy', ['copyJS', 'copyFonts']);
