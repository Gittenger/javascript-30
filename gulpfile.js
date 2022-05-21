const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const del = require('del')

gulp.task('styles', () => {
	return gulp
		.src('styles/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./'))
})

gulp.task('clean', () => {
	return del(['./index.css'])
})

gulp.task('watch', () => {
	gulp.watch('./styles/*.scss', done => {
		gulp.series(['clean', 'styles'])(done)
	})
})

gulp.task('default', gulp.series(['clean', 'styles', 'watch']))
