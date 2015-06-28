var exec = require('child_process').exec,
	del = require('del');
    eol = require('os').EOL;
	gulp = require('gulp'),
    less = require('gulp-less');
	
	//minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

var basePath = '../';
var prodRoot = basePath+'production/public';

//**** main tasks to bundle the app ****//
gulp.task('prod', ['prod-copy', 'prod-rjs', 'prod-less']);

gulp.task('prod-copy', function(){
	// copy all under app, keep data folder too, but no data
	gulp.src(['app/**/*', '!app/data/**', '!app/views/**'], {cwd: basePath })
	.pipe(uglify())
	//.on('error', function(err){ console.log(err); })
	.pipe(gulp.dest(basePath+'production/app'));

	gulp.src(['app/views/**'], {cwd: basePath })
	//.on('error', function(err){ console.log(err); })
	.pipe(gulp.dest(basePath+'production/app/views'));

	// copy all package files '.bowerrc, bower.json, package.json, server.js
	gulp.src(['.bowerrc', 'bower.json', 'package.json', 'server.js'], {cwd: basePath })
	.pipe(gulp.dest(basePath+'production'));

	gulp.src(['utils/**/*'], {cwd: basePath })
	.pipe(uglify())
	.pipe(gulp.dest(basePath+'production/utils'));
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


gulp.task('less', function() {
    return gulp.src(['public/less/app.less'], {cwd: basePath })
                .pipe(less())
                .pipe(gulp.dest(basePath+'public/css'));
});

gulp.task('wless', ['less'], function() {
    gulp.watch(basePath+'public/less/**', ['less']);
});



