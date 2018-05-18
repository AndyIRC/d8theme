/**
 *
 * Gulp file to build the theme
 *
 */

// gulp is the main engine
var gulp = require('gulp');

// Gulp Sass to allow us to write SCSS and compile into CSS, based on Node Sass
var sass = require('gulp-sass');

// Lint checks the SCSS we write to ensure it adheres to best practices and standards. Check out link.yml for configuration
var sassLint = require('gulp-sass-lint');

/**
 * Paths to project folders
 */
var paths = {
  styles: {
    input: 'scss/**/*.{scss,sass}',
    output: 'css/'
  },
};

gulp.task('lint', ['lint:sass']);

gulp.task('lint:sass', function () {
  return gulp.src(paths.styles.input)
  // use gulp-cached to check only modified files.
      .pipe(sassLint({configFile: 'lint.yml', files: {ignore: 'scss/_variables.scss'}}))
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError())
});

gulp.task('build:styles', function () {
  gulp.src(paths.styles.input)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(paths.styles.output))
  ;

});

/**
 * Task Runners
 */
// Compile files
gulp.task('compile', [
  'build:styles', 'lint'
]);

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(['scss/**/*.scss','scss/*.scss'], ['build:styles', 'lint']);
});

// Default Task
gulp.task('default', ['compile']);