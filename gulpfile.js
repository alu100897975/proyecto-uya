'use strict'
var
    gulp = require('gulp'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass'),
    reload = browserSync.reload;

gulp.task('browser-sync', ['nodemon'], ()=>{
    browserSync.init(null,{
        proxy: "http://localhost:8080"
    });
});
gulp.task('sass', ()=>{
    return gulp.src('./development/css/*.scss')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(gulp.dest('./public/css'))
})
gulp.task('default', ['sass','browser-sync'], ()=>{
    gulp.watch('./development/**/*.scss', ['sass', reload]);
    gulp.watch(['./public/js/*.js','./views/**/*.pug'], reload);
});

gulp.task('nodemon', (cb)=>{
    var init = false;
    return nodemon({script: './app.js', ignore: ["public/js/*.js"]}).on('start', ()=>{
        if(!init){
            init = true;
            cb();
        }
    })
})
