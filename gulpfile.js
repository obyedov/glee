const {
  src,
  dest,
  watch,
  parallel,
  series
} = require('gulp')
const scss = require('gulp-sass')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const notify = require('browser-sync/dist/public/notify')
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()
const del = require('del')
const fileinclude = require("gulp-file-include")
const rename = require("gulp-rename")

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  })
}

function html() {
  return src([
      'app/html/index.html',
      '!app/**/_*.html'
    ])
    .pipe(fileinclude())
    .pipe(
      rename({
        basename: "index"
      })
    )
    .pipe(dest('app/'))
}

function styles() {
  return src([
// 'node_modules/font-awesome/css/font-awesome.min.css',
      'node_modules/slick-carousel/slick/slick.scss',
      'app/scss/style.scss'
    ])
    .pipe(scss({
      outputStyle: 'compressed'
    }))
    .pipe(src([
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css'
    ]))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/mixitup/dist/mixitup.min.js',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
      'node_modules/slick-carousel/slick/slick.min.js',
      'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function images() {
  return src('app/images/**/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(dest('dist/images'))
}

function build() {
  return src([
      'app/**/*.html',
      '!app/**/_*.html',
      '!app/**/@*.html',
      'app/css/style.min.css',
      'app/js/main.min.js'
    ], {
      base: 'app'
    })
    .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['app/scss/**/*.scss'], styles)
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts)
  watch(['app/**/*.html', '!app/index.html'], html).on('change', browserSync.reload)
}

exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.browsersync = browsersync
exports.watching = watching
exports.images = images
exports.cleanDist = cleanDist
exports.build = series(cleanDist, images, build)

exports.default = parallel(html, styles, scripts, browsersync, watching)