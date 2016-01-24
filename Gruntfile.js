module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'release/styles/style.css': 'source/styles/style.scss'
                }
            }
        },
        jade: {
            dev: {
                options: {
                    pretty: true,
                    data: {
                        debug: true
                    }
                },
                files: {
                    'release/index.html': 'source/index.jade'
                }
            },
            prod: {
                options: {
                    pretty: false
                },
                files: {
                    'release/index.html': 'source/index.jade'
                }
            }
        },
        concat: {
            scripts: {
                src: ['source/scripts/vendor/*.js', 'source/scripts/main.js'],
                dest: 'release/scripts/main.js'
            }
        },
        postcss: {
            options: {
                map: false,
                failOnError: false,
                processors: [
                    require('autoprefixer')({
                        browsers: ['> 1%', 'ie >= 7']
                    }),
                    require('cssnano')
                ]
            },
            dist: {
                src: 'release/styles/style.css',
                dest: 'release/styles/style.css'
            }
        },
        uglify: {
            dist: {
                files: {
                    'release/scripts/main.min.js': ['release/scripts/main.js']
                }
            }
        },
        watch: {
            layouts: {
                files: 'source/index.jade',
                tasks: 'jade'
            },
            styles: {
                files: ['source/styles/**/*.scss'],
                tasks: ['sass', 'postcss'],
                options: {
                    spawn: false
                }
            },
            scripts: {
                files: ['source/scripts/**/*.js'],
                tasks: ['concat']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-newer');


    grunt.registerTask('default', ['newer:sass', 'newer:concat', 'newer:postcss', 'newer:jade:dev', 'watch']);
    grunt.registerTask('all', ['sass', 'concat', 'postcss', 'jade:dev']);
    grunt.registerTask('dist', ['uglify', 'jade:prod']);


}