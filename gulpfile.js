const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass"); // минификация
const concat = require("gulp-concat"); // конкатенация/объединение + имя
const browserSync = require("browser-sync").create(); // live update 
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin"); // отпимизация img
const del = require("del"); // удаление dist-папки
const ghpages = require('gh-pages'); // gh-pages for dist folder


ghpages.publish('dist', {    //npm run deploy
    repo: 'https://github.com/Fpsska/virtual-piano.git',
    message: 'Auto-generated commit'
});

function browsersync() {  // live update 
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function images() {
    return src("app/assets/img/**/*")
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]
        ))
        .pipe(dest("dist/assets/img"));
}

function scripts() {
    return src([
        "node_modules/jquery/dist/jquery.js",
        "app/assets/js/main.js"
    ])
        .pipe(concat("main.min.js")) // конкатенация + единое название 
        // .pipe(uglify())   // минификация
        .pipe(dest("app/assets/js"))  // конечный путь
        .pipe(browserSync.stream());
}

function styles() {  /*КОМПИЛЯЦИЯ scss -> style.min.css*/
    return src("app/assets/scss/style.scss")
        .pipe(scss({ outputStyle: "expanded" }))
        .pipe(concat("style.min.css"))
        .pipe(dest("app/css"));
}

function audio() {  
    return src("app/assets/audio/**/*.mp3")
        .pipe(dest("app/assets/audio"));
}

function watching() {
    watch(["app/assets/scss/**/*.scss"], styles);
    watch(["app/assets/js/**/*.js", "!app/assets/js/main.min.js"], scripts);
    watch(["app/assets/audio/**/*.mp3"], audio);
    watch(["app/*.html"]).on("change", browserSync.reload);
}


function build() {
    return src([
        "app/*.html",
        "app/css/style.min.css",
        "app/assets/js/main.min.js",
        "app/assets/audio/**/*.mp3"
    ], { base: "app" })
        .pipe(dest([
            "dist"
        ]));
}

function cleanDist() {
    return del("dist");
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, audio, browsersync, watching);
