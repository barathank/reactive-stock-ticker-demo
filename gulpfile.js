"use strict";
var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    del = require('del');

gulp.task('browserify', function() {
    gulp.src('src/js/index.js')
      .pipe(browserify({transform: 'reactify'}))
      .pipe(concat('index.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function(cb) {
  del(['./dist/*'], cb);
});

gulp.task('copy', function() {
    gulp.src(['src/index.html', 'css/*.css'])
      .pipe(gulp.dest('dist'));
});

gulp.task('build', ['browserify', 'copy']);

gulp.task('watch', ['build'], function() {
    gulp.watch('src/**/*.*', ['build']);
});

// gulp.task('package', ['clean', 'build'], function() {
//   gulp.src(['css/**', 'js/**', 'index.html', 'build.js', 'README.md'], {base: '.'})
//       .pipe(gulp.dest('./dist/'));
// });

gulp.task('default', ['clean', 'build']);
