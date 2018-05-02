// 引入 gulp
const gulp = require('gulp')
// 引入插件
const browserSync = require('browser-sync').create() // 瀏覽器同步
const pug = require('gulp-pug')
const sass = require('gulp-sass') // sass
const plumber = require('gulp-plumber') // 載入 gulp-plumber
const gulpImagemin = require('gulp-imagemin') //壓縮圖片

// 路徑設定
const path = {
  source: './src/', // 原始碼
  build: './build/' // 輸出位置
}

// 服務
gulp.task('browser-sync', ['pug', 'sass', 'image'], function() {
  browserSync.init(['css/*.css', 'js/*.js'], {
    server: {
      baseDir: 'build',
      directory: false,
      index: 'pages/index.html',
      routes: {
        '/index.html': 'build/pages/index.html',
        '/about.html': 'build/pages/about.html'
      }
    }
  })
  gulp.watch(path.source + '**/*.pug', ['pug']).on('change', browserSync.reload)
  gulp.watch(path.build + '*.html').on('change', browserSync.reload)
  gulp.watch(path.source + '*assets/css/*.scss', ['sass']).on('change', browserSync.reload)
  gulp.watch(path.build + '*.css').on('change', browserSync.reload)
})

// 編譯pug
gulp.task('pug', function() {
  return gulp
    .src([!path.source + 'Layout.pug', path.source + '**/pages/*.pug'])
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(path.build))

    .pipe(browserSync.stream({ match: path.source + '**/*.pug' }))
})
// 編譯 SASS
gulp.task('sass', function() {
  return gulp
    .src(path.source + 'assets/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(path.build + 'css/'))
    .pipe(browserSync.stream())
})

// 壓縮圖片
gulp.task('image', function() {
  gulp
    .src(path.source + 'assets/img/**')
    .pipe(gulpImagemin())
    .pipe(gulp.dest(path.build + 'img'))
})

gulp.task('default', ['browser-sync'])

// 參考文檔
// 1.部落客
// https://kejyuntw.gitbooks.io/gulp-learning-notes/

// 2.scotch.io
// https://scotch.io/tutorials/how-to-use-browsersync-for-faster-development#toc-using-browsersync-and-sass

// 3.browsersync
// https://browsersync.io/docs/gulp#gulp-manual-reload
