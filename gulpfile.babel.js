'use strict';
// 引入 gulp
import gulp from 'gulp'
import babel from 'gulp-babel'
import jshint from 'gulp-jshint'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import clean from 'gulp-clean'
import imagemin from 'gulp-imagemin'
import webpack from 'gulp-webpack'
import named from 'vinyl-named'

const paths = {
  src: 'src/',
  dest: 'dist/'
};

// 编译Sass
gulp.task('sass', () => {
    gulp.src(`./src/**/*.{css,scss,eot,eot@,ttf,woff}`)
        // .pipe(sass())
        .pipe(gulp.dest(`./dist/`));
});

// 合并，压缩文件
gulp.task('scripts', () =>  {
    gulp.src(`./src/common/**/*.js`)
        .pipe(uglify())
        .pipe(gulp.dest('./dist/common/'))
});


gulp.task('setbabel', () =>  {
    gulp.src([`./src/module/**/*.{js,handlebars}`,`./src/module/**/*.{js,handlebars}`])
        .pipe(babel())
        // .pipe(named((file) => {
        //     console.log(file.path.replace(/^.*src\/module\/$/g, ''))
        //     return file.path.replace(/^.*src\/module\/$/g, '');
        // }))
        .pipe(webpack({
            output: {
                filename: '[name]'
            }
        }))
        // .pipe(uglify())
        .pipe(gulp.dest('./dist/'))
});


gulp.task('imagemin', () => {
    gulp.src(`./src/**/*.{png,gif,jpg}`)
        // .pipe(imagemin())
        .pipe(gulp.dest('./dist/'))
})



// 清空图片、样式、js
gulp.task('clean', () =>  {
  return gulp.src(`./dist/`, {read: false})
    .pipe(clean({force: true}));
});



// 默认任务
gulp.task('default', () => {
    gulp.run('sass', 'scripts','imagemin','setbabel');

    // 监听文件变化
    gulp.watch([`./src/module/**/*.{js,handlebars}`,`./src/module/**/*.{js,handlebars}`,`./src/**/*.{css,scss,eot,eot@,ttf,woff}`,`./src/**/*.{png,gif,jpg}`], () => {
        gulp.run('sass','scripts','imagemin','setbabel');
    });
});