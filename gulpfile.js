//引入gulp组件
var gulp = require("gulp");

var htmlmin = require("gulp-htmlmin");

var less = require("gulp-less");

var cssnano = require("gulp-cssnano");

var uglify = require("gulp-uglify");

var browserSync = require('browser-sync').create();
//  gulp.task('sayHello',function(){
// 	console.log("Hello World!");
// });

 gulp.task('html',function(){
 	gulp.src('src/**/*.html')
 	.pipe(gulp.dest('dist/'));
 });
//编译less文件  
gulp.task('less',function(){
	gulp.src('src/less/**/*.less')
	.pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream:true}));
});

//js压缩
gulp.task('js',function(){
	gulp.src('src/js/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js/'))
	.pipe(browserSync.reload({stream:true}));
});

//定义监听
gulp.task('watch',['html','less','js'],function(){
	gulp.watch('src/**/*.html',['html']);
	gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/less/**/*.less',['less']);
});

//启动web服务

gulp.task('server',function(){
	browserSync.init({
		server:{
			baseDir:"dist/"
		}
	})
})

//定义一个默认任务,该任务自动调用serve和watch任务
gulp.task('default',['watch','server']);