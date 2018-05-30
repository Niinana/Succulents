/* ---------- CSS ---------- */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('style', function() {
  return gulp.src('../css/style.scss')
    .pipe(sass({
      style: 'expanded'
    }))
    //.on('error', errorLog)
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(gulp.dest('../css'));
});

/* ---------- watching for changes ---------- */
gulp.task('watch', function(){
  gulp.watch('../css/style.scss', ['style']);
});

/* ---------- default ---------- */
gulp.task('default', ['watch']);
