'use strict';

var gulp          = require('gulp'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    del           = require('del'),
    sass          = require('gulp-sass'),
    plumber       = require('gulp-plumber'),
    jshint        = require('gulp-jshint'),
    minifyCss     = require('gulp-minify-css'),
    minifyHtml    = require('gulp-minify-html'),
    ngAnnotate    = require('gulp-ng-annotate'),
    htmlify       = require('gulp-angular-htmlify'),
    templateCache = require('gulp-angular-templatecache'),
    autoprefixer  = require('gulp-autoprefixer'),
    changed       = require('gulp-changed'),
    paths         = {
      scripts:        'src/js/**/*.js',
      images:         'src/img/**/*',
      stylesheets:    'src/css/',
      templatesIndex: 'src/views/index.html',
      templatesAll:   ['src/views/**/*.html', '!src/views/index.html'],
    }
;

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('css:sass', function () {
  return gulp.src(paths.stylesheets + 'style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifyCss())
    .pipe(plumber.stop())
    .pipe(gulp.dest('build/css'))
  ;
});

gulp.task('css:libs', function () {
  gulp.src([
    'bower_components/foundation/css/normalize.css',
    'bower_components/foundation/css/foundation.css'
  ])
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(concat('libs.min.css'))
    .pipe(gulp.dest('build/css'))
  ;
});

gulp.task('scripts:jshint', function () {
  gulp.src(paths.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
  ;
});

gulp.task('scripts:angular', function () {
  return gulp.src([
    'bower_components/angular/angular.js',
    'bower_components/angular-resource/angular-resource.js'
  ])
    .pipe(concat('angular-all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
  ;
});

gulp.task('scripts:vendors', function () {
  return gulp.src([''])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
  ;
})

gulp.task('scripts:app', function () {
  return gulp.src([
    'src/js/app.js',
    'src/js/services/**/*.js',
    'src/js/controller/**/*.js',
    'src/js/directives/**/*.js',
    'src/js/resources/**/*.js',
    'src/js/filters/**/*.js',
  ])
    .pipe(plumber())
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(plumber.stop())
    .pipe(gulp.dest('build/js'))
  ;
});

gulp.task('templates:all', function() {
  return gulp.src(paths.templatesAll)
    .pipe(plumber())
    .pipe(minifyHtml({ empty: true }))
    .pipe(templateCache({
      root: 'views',
      standalone: true
    }))
    .pipe(htmlify())
    .pipe(plumber.stop())
    .pipe(gulp.dest('build/js'));
});

gulp.task('templates:index', function() {
  return gulp.src(paths.templatesIndex)
    .pipe(plumber())
    .pipe(minifyHtml({ empty: true }))
    .pipe(htmlify())
    .pipe(plumber.stop())
    .pipe(gulp.dest('build'));
});

// Watch
gulp.task('watch', function() {
  gulp.watch(paths.styles + '**/*.scss', ['sass']);
  gulp.watch(paths.scripts, ['scripts:app']);
  gulp.watch(paths.templatesAll, ['templates:all']);
  gulp.watch(paths.templatesIndex, ['templates:index']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('css:sass', 'css:libs', 'scripts:angular', 'scripts:vendors',
    'scripts:app', 'scripts:jshint', 'templates:all', 'templates:index',
    'watch');
});

