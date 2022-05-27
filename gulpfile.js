const {series, src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const webp = require('gulp-webp');
//css

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
// Imagenes 

const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');
const plumber = require('gulp-plumber');
//javascript
const terser = require('gulp-terser-js');

//css
function css(){
    return src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
    
}
//
function versionWebp(done){
    const opciones={
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
    done();
}
function versionAvif(done){
    const opciones={
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
    done();
}
function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(imagemin(opciones))
            .pipe(dest('build/img'));

    done();
}
function minimizarcss(){
    return src('src/scss/**/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(dest('src/css'));

}
function javascript(done){
    src('src/js/**/*.js', javascript)
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));
    done();
}
function dev(done){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();

}

exports.css = css;
exports.js = javascript;
exports.versionWebp=versionWebp;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.minimizarcss = minimizarcss;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev, javascript);