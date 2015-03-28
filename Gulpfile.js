var gulp= require('gulp')

var gulpNgAnnotate= require('gulp-ng-annotate')
var gulpUglify= require('gulp-uglify')
var gulpRename= require('gulp-rename')
var gulpLess= require('gulp-less')
var gulpAutoprefixer= require('gulp-autoprefixer')
var gulpJade= require('gulp-jade')



gulp.task('scripts', function () {
    return gulp.src(['source/scripts/*.js'])
        .pipe(gulp.dest('release/scripts'))
        .pipe(gulpNgAnnotate())
        .pipe(gulpUglify())
        .pipe(gulpRename({suffix: '.min'}))
        .pipe(gulp.dest('release/scripts'))
    ;
})

gulp.task('styles', function () {
    return gulp.src(['source/styles/*.less'])
        .pipe(gulpLess())
        .pipe(gulpAutoprefixer())
        .pipe(gulp.dest('release/styles'))
    ;
})

gulp.task('templates', function() {
    return gulp.src(['source/*.jade'])
        .pipe(gulpJade({ locals: {}, pretty: true }))
        .pipe(gulp.dest('release'))
    ;
})

gulp.task('watch', function () {
    gulp.watch(['source/scripts/**/*.js'], ['scripts'])
    gulp.watch(['source/styles/**/*.less'], ['styles'])
    gulp.watch(['source/**/*.jade'], ['templates'])
})



gulp.task('default', ['scripts', 'styles', 'templates', 'watch'])
