module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: "src/",
                        src: "**",
                        dest: "dest/"
                    },
                    { src: "node_modules/jquery/dist/jquery.js", dest: "dest/overlook/js/lib/jquery.js" },
                    { src: "node_modules/popper.js/dist/umd/popper.js", dest: "dest/overlook/js/lib/popper.js" },
                    { src: "node_modules/angular/angular.js", dest: "dest/overlook/js/lib/angular.js" },
                    { src: "node_modules/angular-route/angular-route.js", dest: "dest/overlook/js/lib/angular-route.js" },
                    { src: "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js", dest: "dest/overlook/js/lib/angular-ui-bootstrap.js" },
                    { src: "node_modules/bootstrap/dist/css/bootstrap.css", dest: "dest/overlook/css/lib/bootstrap.css" },
                    { src: "node_modules/bootstrap/dist/js/bootstrap.js", dest: "dest/overlook/js/lib/bootstrap.js" }
                ]
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
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['copy']);
    grunt.registerTask('launch', ['connect']);
  };