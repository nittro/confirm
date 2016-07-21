module.exports = function(grunt) {

    var files = [
        'src/js/Nittro/Extras/Confirm/Confirm.js',
        'src/js/Nittro/Extras/Confirm/AutoConfirm.js',
        'src/js/Nittro/Extras/Confirm/Bridges/ConfirmDI.js'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                mangle: false,
                sourceMap: false
            },
            confirm: {
                files: {
                    'dist/js/nittro-extras-confirm.min.js': files
                }
            }
        },

        concat: {
            options: {
                separator: ";\n"
            },
            confirm: {
                files: {
                    'dist/js/nittro-extras-confirm.js': files
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['uglify', 'concat']);

};
