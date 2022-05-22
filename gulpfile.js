const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const mode = require('gulp-mode')({
	modes: ['production', 'development'],
	default: 'development',
	verbose: false,
})
const del = require('del')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

gulp.task('styles', () => {
	const dev = [autoprefixer()]
	const prod = [autoprefixer(), cssnano()]

	return gulp
		.src('styles/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(mode.development(postcss(dev)))
		.pipe(mode.production(postcss(prod)))
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

gulp.task(
	'default',
	process.env.NODE_ENV === 'development'
		? gulp.series(['clean', 'styles', 'watch'])
		: gulp.series(['clean', 'styles'])
)
