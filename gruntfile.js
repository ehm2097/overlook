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
                    // Library files
                    { src: "node_modules/angular/angular.js", dest: "dest/js/lib/angular.js" },
                    { src: "node_modules/angular-route/angular-route.js", dest: "dest/js/lib/angular-route.js" },
                    { src: "node_modules/bootstrap/dist/js/bootstrap.js", dest: "dest/js/lib/bootstrap.js" },
                    { src: "node_modules/bootstrap/dist/css/bootstrap.css", dest: "dest/css/lib/bootstrap.css" },

                    // Overlook files
                    { src: "src/overlook/css/overlook.css", dest: "dest/overlook/overlook.css" },

                    // Test application files
                    { src: "src/test-app/test-app.html", dest: "dest/index.html" },
                    { expand: true, cwd: "src/test-app/template", src: "**", dest: "dest/template" }
                ]
            }
        },
        concat: {
            overlook: {
                src: [
                    "src/overlook/core/overlook-module.js", 
                    "src/overlook/**/*.js", 
                    "!**/*-spec.js", 
                    "build/templates.js"
                ],
                dest: "dest/js/overlook.js"
            },
            application: {
                src: [
                    "src/test-app/test-app-module.js", 
                    "src/test-app/**/*.js" 
                ],
                dest: "dest/js/test-app.js"
            },
            options: {
                separator: ";\n"
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