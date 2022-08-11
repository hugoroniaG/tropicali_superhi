const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cleanCss = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')

const browserSync = require('browser-sync').create()

const imagemin = require('gulp-imagemin')


gulp.task('sass', function() {
  	// place code for your default task here
  	// we want to run "sass css/app.scss app.css --watch"
	  return gulp.src('src/css/app.scss')
	  	.pipe(sourcemaps.init())
	  	.pipe(sass())
		.pipe(
			cleanCss({
				compatibility: 'ie8'
			})
		)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream())

})

gulp.task('html', function () {
	return gulp.src('src/*.html')
		.pipe(gulp.dest('dist'))
})

gulp.task('fonts', function () {
	return gulp.src('src/fonts/*')
		.pipe(gulp.dest('dist/fonts'))
})

gulp.task('images', function () {
	return gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
})


gulp.task('watch', function () {
	
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	})
	
	gulp.watch('src/*.html', ['html']).on('change', browserSync.reload)
	gulp.watch('src/css/app.scss', ['sass'])
	gulp.watch('src/fonts/*', ['fonts'])
	gulp.watch('src/img/*', ['images'])
})

gulp.task('default', ['html', 'sass', 'fonts', 'images', 'watch'])
