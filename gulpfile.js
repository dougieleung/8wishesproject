// const gulp        = require('gulp');

// const paths = {
//   scripts: {
//     src: './',
//     dest: './build/'
//   }
// };

// async function includeHTML(){
//     return gulp.src([
//       '*.html',
//       '*.css',
//       'pages/*.html',
//       'css/*.css',
//       '!header.html', // ignore
//       '!footer.html', // ignore
//       ])
//       .pipe(fileinclude({
//         prefix: '@@',
//         basepath: '@file'
//       }))
//       .pipe(gulp.dest(paths.scripts.dest));
//   }
  
//   exports.default = includeHTML;

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const fileinclude = require('gulp-file-include');


/*
  -- TOP LEVEL FUNCTIONS 
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

// Logs Message
gulp.task('message', function(){
  return console.log('Gulp is running...');
});

// Copy All HTML files
gulp.task('copyHtml', function includeHTML(){
      return gulp.src(['src/pages/*.html',
           '!src/pages/header.html', // ignore
           '!src/pages/footer.html']) // ignore
      .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
              }))
      .pipe(gulp.dest('dist/pages'));
});

gulp.task('minifyCSS', function() {
      gulp.src('src/css/*.css')
      .pipe(cssnano())
      .pipe(gulp.dest('./dist/css'));
});

// Optimize Images
gulp.task('imageMin', function(){
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'));
});

// Minify JS
gulp.task('minify', function(){
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

// Scripts
gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

// gulp.task('minifyJSON', function () {
//   return gulp.src('src/*.json')
//       .pipe(jsonminify())
//       .pipe(gulp.dest('dist'));
// });

gulp.task('default', ['message', 'copyHtml', 'minifyCSS', 'imageMin', 'sass', 'scripts']);

// gulp.task('watch', function(){
//   gulp.watch('src/js/*.js', ['scripts']);
//   gulp.watch('src/images/*', ['imageMin']);
//   gulp.watch('src/sass/*.scss', ['sass']);
//   gulp.watch('src/*.html', ['copyHtml']);
// });
