var gulp    = require('gulp');
var stylus  = require('gulp-stylus');


gulp.task('stylus'), function() {
    gulp.src('./src/assets/styles/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./out/assets/styles/'));
}