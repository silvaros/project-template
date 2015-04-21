var exec = require('child_process').exec,
	del = require('del');
    eol = require('os').EOL;
	gulp = require('gulp'),
    ignore = require('gulp-ignore');
	less = require('gulp-less'),
	
	//minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

var basePath = '../';
var prodRoot = basePath+'production/public';

//**** main tasks to bundle the app ****//
gulp.task('prod', ['prod-copy', 'prod-rjs', 'prod-less']);

gulp.task('prod-copy', function(){
	// copy all under app, keep data folder too, but no data
	gulp.src(['app/**/*'], {cwd: basePath })
	.pipe(gulp.dest(basePath+'production/app'));
	console.log("prod-copy-app complete");

	/* copy all package files '.bowerrc, .gitignore, bower.json, package.json, server.js, 
	keep data folder too, but no data */
	gulp.src(['.bowerrc', 'bower.json', 'package.json', 'server.js'], {cwd: basePath })
	.pipe(gulp.dest(basePath+'production'));
	console.log("prod-copy-package-files complete");
});

gulp.task('prod-rjs', function(){
	exec("node r.js -o rjs.build.js", function(err, stdout, stderr) {
   		if(err) console.log(err);

		// delete less folder
		del(prodRoot + '/less', {force: true});
		console.log("delete production/less");

		// remove copied lib folder, when we npm install the build let bower take over
		del(prodRoot + '/lib', {force: true});
		console.log("delete production/lib");   	
   	}); 

   	console.log("rjs complete");
});

gulp.task('prod-less', function(){
	gulp.src(['public/less/app.less'], {cwd: basePath })
		.pipe(less())
		.pipe(gulp.dest(basePath+'production/public/css'));
	console.log("prod-less complete");
});


//**** end main tasks to bundle the app ****//


gulp.task('styles', function() {
    return gulp.src(['public/less/app.less'], {cwd: basePath })
                .pipe(less())
                .pipe(gulp.dest(basePath+'public/css'));
});

gulp.task('wless', ['styles'], function() {
    gulp.watch(basePath+'public/less/**', ['styles']);
});



