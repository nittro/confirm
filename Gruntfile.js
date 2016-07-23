module.exports = function(grunt) {

    var files = grunt.file.readJSON('nittro.json').files;

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                mangle: false,
                sourceMap: false
            },
            confirm: {
                files: {
                    'dist/js/nittro-extras-confirm.min.js': files.js
                }
            }
        },

        concat: {
            options: {
                separator: ";\n"
            },
            confirm: {
                files: {
                    'dist/js/nittro-extras-confirm.js': files.js
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['uglify', 'concat']);

};
