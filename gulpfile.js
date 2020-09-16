const gulp= require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//compile sass and inject into browser
function style(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss' ])
      .pipe(sass())
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.stream());
}

// Move js file to src/js
function js(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
  .pipe(gulp.dest("src/js"))
  .pipe(browserSync.stream());
}


//Watch Sass & Server
function watch(){
  browserSync.init({
    server: {
      baseDir: './',
      directory: true
    }
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss' ], style);
  gulp.watch('src/*.html').on('change', browserSync.reload);
}





//Move Fonts Folder to src/fonts
function fonts(){
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest('src/fonts'));
}

//Move font awesome css to src/css
function fa(){
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest('src/css'));
}


exports.js = js;
exports.fonts = fonts;
exports.fa = fa;
exports.style = style;
exports.watch = watch;

exports.default = gulp.parallel(js, fonts, fa, style, watch);