var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlImport = require('gulp-html-import');
var browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass({
            //outputStyle: 'compressed',
            includePaths: [
                'node_modules/breakpoint-sass/stylesheets'
            ]
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

// gulp.task('clean-css', function () {
//     return gulp.src(['./css','./dist/css'], {read: false}).pipe(clean());
// });

gulp.task('html-import', function () {
    return gulp.src('src/*.html')
        .pipe(htmlImport('src/components/'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['sass', 'html-import'], function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch('src/sass/**/*.scss', [/*'clean-css',*/'sass']);
    gulp.watch('src/**/*.html', ['html-import']);
    gulp.watch('dist/**/*.html', browserSync.reload);
});

