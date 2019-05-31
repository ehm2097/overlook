module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngtemplates: {
            overlook: {
                cwd: "src/overlook/template",
                src: "**/*.html",
                dest: "build/templates.js",
                options:{
                    prefix: "/template/overlook/",
                    htmlmin: { 
                        collapseWhitespace: true, 
                        collapseBooleanAttributes: true 
                    }
                }
            }
        },
        copy: {
            main: {
                files: [
                    { src: "node_modules/jquery/dist/jquery.js", dest: "dest/overlook/lib/js/jquery.js" },
                    { src: "node_modules/popper.js/dist/umd/popper.js", dest: "dest/overlook/lib/js/popper.js" },
                    { src: "node_modules/angular/angular.js", dest: "dest/overlook/lib/js/angular.js" },
                    { src: "node_modules/angular-route/angular-route.js", dest: "dest/overlook/lib/js/angular-route.js" },
                    { src: "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js", dest: "dest/overlook/lib/js/angular-ui-bootstrap.js" },
                    { src: "node_modules/bootstrap/dist/css/bootstrap.css", dest: "dest/overlook/lib/css/bootstrap.css" },
                    { src: "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css", dest: "dest/overlook/lib/css/ui-bootstrap.css" },
                    { src: "node_modules/bootstrap/dist/js/bootstrap.js", dest: "dest/overlook/lib/js/bootstrap.js" },
                    { src: "src/index.html", dest: "dest/index.html" },
                    { src: "src/overlook/template/overlook.html", dest: "dest/overlook/overlook.html" },
                    { src: "src/overlook/css/overlook.css", dest: "dest/overlook/overlook.css" },
                    { expand: true, cwd: "src/test-app/js", src: "**", dest: "dest/js" },
                    { expand: true, cwd: "src/test-app/template", src: "**", dest: "dest/template" }
                ]
            }
        },
        concat: {
            js: {
                src: ["src/overlook/js/main.js", "src/overlook/js/**", "!**/*-spec.js", "build/templates.js"],
                dest: "dest/overlook/overlook.js"
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
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('default', ['ngtemplates', 'copy', "concat"]);
    grunt.registerTask('launch', ['connect']);
  };