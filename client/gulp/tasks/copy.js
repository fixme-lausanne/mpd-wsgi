var gulp = require('gulp');

gulp.task('copyHTML', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('build'));
});

gulp.task('copyJS', function() {
    return gulp.src('src/lib/modernizr/modernizr.js')
        .pipe(gulp.dest('build/js'));
});

gulp.task('copyFonts', function() {
    return gulp.src('src/lib/font-awesome/fonts/**')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('copy', ['copyHTML', 'copyJS', 'copyFonts']);
