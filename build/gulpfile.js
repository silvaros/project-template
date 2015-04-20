var exec = require('child_process').exec,
	del = require('del');
    eol = require('os').EOL;
	gulp = require('gulp'),
    ignore = require('gulp-ignore');
	less = require('gulp-less'),
	
	//minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

var prodRoot = '../production/public';

// main task to bundle the app
gulp.task('prod', ['prod-copy-app-folder', 'prod-rjs', 'prod-less', 'prod-cleanup' ]);

gulp.task('prod-copy-app-folder', function(){
	// copy all under app, keep data folder too, but no data
	gulp.src(['app/**/*', '!app/data/**/*'], { "base" : "." })
	.pipe(gulp.dest('production'));
});

gulp.task('prod-rjs', function(){
	exec("node r.js -o rjs.build.js", function(err, stdout, stderr) {
   		if(err) console.log(err);
   	}); 
});

gulp.task('prod-less', function(){
	gulp.src([ prodRoot + '/less/app.less'])
		.pipe(less())
		.pipe(gulp.dest('production/public/css'));
});

gulp.task('prod-cleanup', function(){
	// delete less files after compiling css
	//del(prodRoot + '/less', {force: true});
	// remove copied lib folder when we npm install the build let bower take over
	//del(prodRoot + '/lib', {force: true});
});



gulp.task('styles', function() {
    return gulp.src(['../public/less/app.less'])
                .pipe(less())
                .pipe(gulp.dest('../public/css'));
});

gulp.task('wless', ['styles'], function() {
    gulp.watch('../public/less/**', ['styles']);
});



