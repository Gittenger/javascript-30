const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const del = require('del')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

gulp.task('styles', () => {
	const plugins = [autoprefixer(), cssnano()]

	return gulp
		.src('styles/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(plugins))
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
