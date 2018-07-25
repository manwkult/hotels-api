var gulp = require("gulp");
var del = require("del");
var htmlmin = require("gulp-htmlmin");

var config = {
  /*data*/
  data: "src/data/*.json",

  /*assets images*/
  images: "src/assets/images/*.{png,jpg,jpeg,ico,gif,svg}",

  /*views*/
  views: "views/*",

  /*out*/
  dataout: "dist/data",
  imagesout: "dist/assets/images",
  viewsout: "dist/views"
};

gulp.task("task-data", ["clean-data"], function() {
  return gulp.src([config.data]).pipe(gulp.dest(config.dataout));
});

gulp.task("task-images", ["clean-images"], function() {
  return gulp.src([config.images]).pipe(gulp.dest(config.imagesout));
});

gulp.task("task-views", ["clean-views"], function() {
  return gulp
    .src([config.views])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(config.viewsout));
});

gulp.task("clean-data", function() {
  return del([config.imagesout]);
});

gulp.task("clean-images", function() {
  return del([config.imagesout]);
});

gulp.task("clean-views", function() {
  return del([config.viewsout]);
});

gulp.task("data", ["task-data"], function() {});
gulp.task("images", ["task-images"], function() {});
gulp.task("views", ["task-views"], function() {});


gulp.task("default", ["data", "images", "views"], function() {});
