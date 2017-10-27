const spawn = require('child_process').spawn,
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    gulpWebpack = require('gulp-webpack'),
    webpackConfig = require('./webpack.config.js'),
    webpack = require('webpack');

let node;

const paths = {
    source: './source',
    dest: './clieny',
    scripts: {
        src: './source/js/**/*.js',
        dest: 'client/js/'
    },
    styles: {
        src: './source/scss/**/*.scss',
        dest: 'client/css'
    },
    server: {
        src: ['./server.js', './server/**/*.js']
    }
};

//Scripts
gulp.task('scripts', () => {

    gulp.src(paths.scripts.src)
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
});

//SASS to CSS
gulp.task('styles', () => {

    gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(sourcemaps.write())
        .pipe(prefix('last 3 version', '> 1%', 'ie 10', 'Opera 12.1'))
        .pipe(gulp.dest(paths.styles.dest))
});

gulp.task('server', function () {

    if (node) node.kill();
    node = spawn('node', ['server.js'], { stdio: 'inherit' });
    node.on('close', function (code) {

        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('default', ['server'], function() {

    gulp.watch(paths.server.src, ['server']);
    gulp.watch(paths.scripts.src, ['scripts']);
    gulp.watch(paths.styles.src, ['styles']);
});

// clean up if an error goes unhandled.
process.on('exit', function () {

    if (node) node.kill();
});