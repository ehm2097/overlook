module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    { src: "node_modules/jquery/dist/jquery.js", dest: "dest/js/lib/jquery.js" },
                    { src: "node_modules/popper.js/dist/umd/popper.js", dest: "dest/js/lib/popper.js" },
                    { src: "node_modules/angular/angular.js", dest: "dest/js/lib/angular.js" },
                    { src: "node_modules/angular-route/angular-route.js", dest: "dest/js/lib/angular-route.js" },
                    { src: "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js", dest: "dest/js/lib/angular-ui-bootstrap.js" },
                    { src: "node_modules/bootstrap/dist/css/bootstrap.css", dest: "dest/css/lib/bootstrap.css" },
                    { src: "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css", dest: "dest/css/lib/ui-bootstrap.css" },
                    { src: "node_modules/bootstrap/dist/js/bootstrap.js", dest: "dest/js/lib/bootstrap.js" },
                    { src: "src/index.html", dest: "dest/index.html" },
                    { src: "src/overlook/css/overlook.css", dest: "dest/css/overlook.css" },
                    { expand: true, cwd: "src/overlook/template", src: "**", dest: "dest/template/overlook" },
                    { expand: true, cwd: "src/test-app/js", src: "**", dest: "dest/js/app" },
                    { expand: true, cwd: "src/test-app/template", src: "**", dest: "dest/template/app" }
                ]
            }
        },
        concat: {
            js: {
                src: ["src/overlook/js/main.js", "src/overlook/js/**", "!**/*-spec.js"],
                dest: "dest/js/overlook/overlook.js"
            }
        },
        connect: {
            server: {
                options: {
                    base: "dest/",
                    keepalive: true,
                    open: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['copy', "concat"]);
    grunt.registerTask('launch', ['connect']);
  };