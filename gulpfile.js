/*
 * gulp 构建文件
 * @Author: Cphayim 
 * @Date: 2017-04-12 20:25:31 
 * @Last Modified by: Cphayim
 * @Last Modified time: 2017-04-16 17:40:56
 */

const gulp = require('gulp');
// 文件合并
const concat = require('gulp-concat');
// js 编译 es6 -> es5
const babel = require('gulp-babel');
// js 压缩
const uglify = require('gulp-uglify');
// Sass 编译
const sass = require('gulp-sass');
// CSS 压缩
const minifyCss = require('gulp-minify-css');
// 代码地图生成
const sourcemaps = require('gulp-sourcemaps');
// 文件重命名
const rename = require('gulp-rename');

// 监视路径
const paths = {
    sass: ['./dev/scss/**/*.scss'],
    es6: ['./dev/js/**/*.js']
};

gulp.task('default', ['sass','js']);

// 编译 scss -> css (path: dev -> www)
gulp.task('sass', function () {
    return gulp.src('./dev/scss/ionic.app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/css'))
});

// 编译 JavaScript ES6 -> ES5 (path: dev -> www)
gulp.task('js',function(){
    return gulp.src(paths.es6)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('ionic.app.min.js'))
        .pipe(uglify({
            mangle: true, // 混淆所有变量名
            preserveComments: 'license' // 保留头部注释
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./www/js'))
});

// 复制其他文件 (path: dev -> www)
// gulp.task('copyOther',function(){
// })

// 监视任务
gulp.task('watch', ['sass','js'], function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.es6, ['js']);
});