'use strict'
var
    gulp = require('gulp'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),

    reload = browserSync.reload;

gulp.task('browser-sync', ['nodemon'], ()=>{
    browserSync.init(null,{
        proxy: "http://localhost:8080"
    });
});
gulp.task('default', ['browser-sync'], ()=>{
    gulp.watch(['./public/js/*.js','./views/**/*.pug', './development/css/*.scss'], reload);
});

gulp.task('nodemon', (cb)=>{
    var init = false;
    return nodemon({script: './app.js'}).on('start', ()=>{
        if(!init){
            init = true;
            cb();
        }
    })
})
