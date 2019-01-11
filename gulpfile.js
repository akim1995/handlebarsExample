const env = 'development';
const { series, parallel, src, dest, watch } = require('gulp');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
sass.compiler = require('node-sass');

function sassTask(cb) {
	return src('assets/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(rename('style.css'))
		.pipe(dest('css/'));
		cb();
}
function javascript(cb) {
	if(env === 'development') {
		src('assets/js/**/*.js')
		.pipe(dest('js/'));
		cb();
	} else {
	src('assets/js/**/*.js')
  .pipe(sourcemaps.init())
	.pipe(babel({
	presets: ['@babel/env']
	}))
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(dest('js/'));
	cb();
	}
}
function watchFiles() {
	  watch("./assets/scss/**/*", series(sassTask));
	  watch("./assets/js/**/*", series(javascript));
}
if (env === 'development') {
	exports.default = series(sassTask, javascript);
	exports.sass = sassTask;
	exports.js = javascript;
	exports.watch = watchFiles;
}
if (env === 'production') {
	exports.default = undefined;
}
