module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                mangle: false,
                sourceMap: false
            },
            confirm: {
                files: {
                    'dist/js/nittro-confirm.min.js': [
                        'src/js/Nittro/Widgets/Confirm.js',
                        'src/js/Nittro/Services/AutoConfirm.js'
                    ]
                }
            }
        },

        concat: {
            options: {
                separator: ";\n"
            },
            confirm: {
                files: {
                    'dist/js/nittro-confirm.js': [
                        'src/js/Nittro/Widgets/Confirm.js',
                        'src/js/Nittro/Services/AutoConfirm.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['uglify', 'concat']);

};
