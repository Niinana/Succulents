const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

gulp.task('style', function() {
  return gulp.src('../css/style.scss')
    .pipe(sass({
      style: 'expanded'
    }))
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(gulp.dest('../css'));
});


gulp.task('script', () =>
	gulp.src('./script.js')
		.pipe(babel({
			presets: [['env', {
      'targets': {
        'browsers': [ '>0.25%']
      }}]]
		}))
    .pipe(rename('script-babeled.js'))
		.pipe(gulp.dest('.'))
);

/* ---------- watching for changes ---------- */
gulp.task('watch', function(){
  gulp.watch('../css/style.scss', ['style']);
  gulp.watch('./script.js', ['script']);
});

/* ---------- default ---------- */
gulp.task('default', ['watch']);
