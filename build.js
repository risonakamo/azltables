const gulp=require("gulp");

gulp.src("icons/*",{base:"icons"}).pipe(gulp.dest("build"));