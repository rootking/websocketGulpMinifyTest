var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('default',['watch']);

gulp.task('jshint',function(){
  return gulp.src('source/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter("fail"));
});

gulp.task('build-js', function(){
  return gulp.src('source/javascript/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('ugly-bundle.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/javascript'));
});


gulp.task('watch',function(){
  gulp.watch('source/javascript/**/*.js', ['jshint','build-js']);
});
