var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bower = require('bower'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sh = require('shelljs');

var paths = {
  stylesheets: ['./app/**/*.scss'],
  scripts: ['./app/**/*.coffee'],
  templates: ['./app/**/*.jade'],
  images: ['./app/images/**/*.*']
};

gulp.task('stylesheets', function(done) {
  gulp.src(paths.stylesheets)
    .pipe(sass())
    .pipe(gulp.dest('./www/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/'))
    .on('end', done);
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(coffee().on('error', gutil.log))
    .pipe(gulp.dest('./www/'))
});

gulp.task('templates', function() {
  var TEMPLATE_LOCALS = {};

  gulp.src(paths.templates)
    .pipe(jade({
      locals: TEMPLATE_LOCALS
    }))
    .pipe(gulp.dest('./www/'))
});

gulp.task('images', function() {
  gulp.src(paths.images)
    .pipe(gulp.dest('./www/images/'))
});

gulp.task('watch', function() {
  gulp.watch(paths.stylesheets, ['stylesheets']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.images, ['images']);
  gulp.watch('./bower.json', ['install']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('default', ['stylesheets', 'scripts', 'templates', 'images', 'install', 'watch']);
