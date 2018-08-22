const gulp=require("gulp");

gulp.src([
    "./fleettables/*.*",

    "./icons/**/*",

    "./popup/**/*",

    "./shiptable/**/*",
    "!**/shiptable-gen/**",
    "!**/shiptable-gen/",

    "./*.*",
    "!.gitignore",
    "!build.*",
    "!*.gql",
    "!package{,-lock}.json",
    "!readme*"
],{base:"."}).pipe(gulp.dest("build"));