const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const jsonminify = require('gulp-jsonminify');

// Copy All HTML files
gulp.task('createHTML', function includeHTML(){
      return gulp.src(['src/pages/*.html',
           '!src/pages/header.html', // ignore
           '!src/pages/footer.html']) // ignore
      .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
              }))
      .pipe(gulp.dest('dist/pages'));
});

// Minify CSS
gulp.task('minifyCSS', function() {
      gulp.src('src/css/*.css')
      .pipe(cssnano())
      .pipe(gulp.dest('./dist/css'));
});

// Optimize Images
gulp.task('optimizeIMG', function(){
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'));
});

// Minify JS
gulp.task('minifyJS', function(){
  gulp.src('src/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

// Compile Sass
gulp.task('sass', function(){
  gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
});

// Concat Scripts
gulp.task('concatJS', function(){
  gulp.src('src/js/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

// Minify JSON
gulp.task('minifyJSON', function () {
  return gulp.src('src/*.json')
      .pipe(jsonminify())
      .pipe(gulp.dest('dist'));
});

gulp.task('copySW', function () {
  return gulp.src('src/sw.js')
      .pipe(gulp.dest('dist'));
});

gulp.task('default', ['createHTML', 'minifyCSS','optimizeIMG','minifyJS', 'sass', 'concatJS', 'minifyJSON','copySW']);