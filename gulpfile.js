// // Node modules
// var fs = require('fs'),
//     vm = require('vm'), 
//     merge = require('deeply'), 
//     chalk = require('chalk'), 
//     es = require('event-stream');

// Gulp and plugins
var gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('styles', function() {
    return gulp.src(['public/less/app.less'])
                .pipe(less())
                .pipe(gulp.dest('public/css'))
});

gulp.task('wless', function() {
    gulp.run('styles');

    gulp.watch('public/less/**', function(e) {
        gulp.run('styles');
    });
});