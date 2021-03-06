let gulp = require("gulp");
let sass = require("gulp-sass");
let path = require("path");
let url = require("url");
let fs = require("fs");
let server = require("gulp-webserver");
let css = require("gulp-clean-css");
let uglify = require("gulp-uglify");

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});


gulp.task("watch", function() {
    return gulp.src("./src/scss/*.scss", gulp.series("sass"))
})


gulp.task('webserver', function() {
    gulp.src('app')
        .pipe(webserver({
            port: 9090,
            open: true,
            mioddleware: function(req, res, next) {
                let pathname = url.parse(req.url).pathname;
                if (pathname == "/iconion") {
                    return
                } else {
                    pathname = pathname == "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
                }
            }
        }));
});


//压缩css
gulp.task('minifyCss', () => {
    return gulp.src('./src/css/*.css')
        .pipe(css())
        .pipe(gulp.dest('dist/css'));
});

//压缩js
gulp.task('minifyJs', () => {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});