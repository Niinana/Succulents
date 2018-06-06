const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

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
	gulp.src('../Test/script.es6')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulp.dest('../Test'))
);

/* ---------- watching for changes ---------- */
gulp.task('watch', function(){
  gulp.watch('../css/style.scss', ['style']);
  gulp.watch('../Test/script.es6', ['script']);
});

/* ---------- default ---------- */
gulp.task('default', ['watch']);
