// 引入 gulp
const gulp = require('gulp')
// 引入插件
const browserSync = require('browser-sync').create() // 瀏覽器同步
const pug = require('gulp-pug')
const sass = require('gulp-sass') // sass
const plumber = require('gulp-plumber') // 載入 gulp-plumber

// 路徑設定
const path = {
  source: './src/', // 原始碼
  build: './build/' // 輸出位置
}

// 服務
gulp.task('browser-sync', ['pug', 'sass'], function() {
  browserSync.init({
    server: './build'
  })
  gulp.watch(path.source + '*.pug', ['pug']).on('change', browserSync.reload)
  gulp.watch(path.build + '*.html').on('change', browserSync.reload)
  gulp.watch(path.source + '*assets/css/*.scss', ['sass']).on('change', browserSync.reload)
  gulp.watch(path.build + '*.css').on('change', browserSync.reload)
})

// 編譯pug
gulp.task('pug', function() {
  return gulp
    .src(path.source + '*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest(path.build))

    .pipe(browserSync.stream({ match: path.source + 'assets/*.pug' }))
})
// 編譯 SASS
gulp.task('sass', function() {
  return gulp
    .src(path.source + 'assets/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(path.build + 'css/'))
    .pipe(browserSync.stream())
})

gulp.task('default', ['browser-sync'])

// 參考文檔
// 1.部落客
// https://kejyuntw.gitbooks.io/gulp-learning-notes/

// 2.scotch.io
// https://scotch.io/tutorials/how-to-use-browsersync-for-faster-development#toc-using-browsersync-and-sass

// 3.browsersync
// https://browsersync.io/docs/gulp#gulp-manual-reload
