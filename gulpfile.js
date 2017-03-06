var gulp = require('gulp');
var haml = require('gulp-haml');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");


gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(require('./webpack.config.js'));

    new WebpackDevServer(compiler, {
      contentBase: "./dest",
        // server and middleware options
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});

/////////////////////////////////////////////
gulp.task("webpack", function(callback) {
    // run webpack
    webpack(
      require('./webpack.config.js'),
      function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('haml', function () {
  gulp.src('./src/haml/**/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('./dest'));
});

///////////////////////////////////////

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.haml'], ['haml']);
});

gulp.task('default', ['haml', 'watch', 'webpack-dev-server']);

gulp.task('build', ['haml', 'webpack'])
