var gulp = require('gulp');
var sass = require('gulp-sass');
var fs = require('fs');
const path = require('path');
var args = require('yargs').argv;
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');

function build(){

  if (args.module == 'all')
  {
	  console.log("Build all modules");
	  var modules = [];
	  fs.readdirSync('./src/modules/').forEach(file => {
		  if (fs.lstatSync(path.join('./src/modules/', file)).isDirectory())
		  {
			  modules.push(file);
		  }
	  });
  }
  else
  {
	  var modules = args.module.split(',');
  }
	  if (modules.length > 0) {
		  for(var i = 0, len = modules.length; i < len; i++) {
			  console.log("Build module: " + modules[i]);
			  gulp
				.src('./src/modules/' + modules[i] + '/**/*.ts')
				.pipe(typescript(tscConfig.compilerOptions))
				.pipe(gulp.dest('./distr/js/modules/' + modules[i]));
				
			  gulp.src('./src/modules/' + modules[i] + '/**/*.scss')
				.pipe(sass().on('error', sass.logError))
				.pipe(gulp.dest('./distr'));
				
			  gulp
				.src('./src/modules/' + modules[i] + '/models/*.ts')
				.pipe(typescript(tscConfig.compilerOptions))
				.pipe(gulp.dest('./distr/js/modules/' + modules[i]));
		  }
	  }
	
}

gulp.task('build', function() {
  build();
});

gulp.task('watch', function() {
	gulp.watch('./src/**', function(){
		build();
	});
});