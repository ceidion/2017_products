var gulp = require('gulp');
var connect = require('gulp-connect');
var haml = require('gulp-haml');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

/////////////////////////////////////////////

gulp.task('haml', function () {
  gulp.src('./app/**/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('./app'));

  gulp.src('./app/**/*.haml')
      .pipe(connect.reload());
});

gulp.task('scss', function () {
  gulp.src('./app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app')
    .pipe(connect.reload()));

  gulp.src('./app/**/*.scss')
      .pipe(connect.reload());
});

gulp.task('coffee', function() {
  gulp.src('./app/**/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./app')
    .pipe(connect.reload()));

  gulp.src('./app/**/*.coffee')
      .pipe(connect.reload());
});

///////////////////////////////////////

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.haml'], ['haml']);
  gulp.watch(['./app/**/*.scss'], ['scss']);
  gulp.watch(['./app/**/*.coffee'], ['coffee']);
});

gulp.task('default', ['connect', 'watch']);
