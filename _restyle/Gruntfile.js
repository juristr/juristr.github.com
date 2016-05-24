// Generated on 2014-06-25 using generator-angular-require 0.1.13
'use strict';

// ## Globbing
// for performance reasons we're only matching one level down:
// `test/spec/{,*/}*.js`
// use this if you want to recursively match all subfolders:
// `test/spec/**/*.js`

var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['./src/{,*/}*.js'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      compass: {
        files: ['./src/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          './src/**/*.html',
          './src/.tmp/styles/{,*/}*.css',
          './src/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function(connect) {
            return [
              //connect.static('./src/.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static('./src')
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    cssmin: {
      dist: {
        // files: {
        //     '../assets/css/new': [
        //       '../assets/css/new/{,*/}*.css'
        //     ]
        // }
      }
    },
    uglify: {
      options: {
        compress: {
          global_defs: {
            "DEBUG": false
          },
          dead_code: true
        },
        mangle: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/js',
          src:'**/*.js',
          dest: '../assets/js/new'
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            './dist'
          ]
        }]
      },
      server: {}
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: './src/.tmp/styles/',
          src: '{,*/}*.css',
          dest: './src/.tmp/styles/'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: './src/styles',
        //cssDir: './src/.tmp/styles',
        cssDir: '../assets/css/new',
        generatedImagesDir: './src/.tmp/images/generated',
        imagesDir: './src/images',
        javascriptsDir: './src/scripts',
        fontsDir: './src/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

  });


  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    // 'ug',
    // 'bower-install',
    // 'bower:app',
    // TODO: deactivated for now...needs to be fixed to sync to karmaBoot.js
    // 'replace:test',
    // 'useminPrepare',
    // 'concurrent:dist',
    // 'autoprefixer',
    // 'concat',
    'clean:dist',
    'cssmin',
    // Below task commented out as r.js (via grunt-contrib-requirejs) will take care of this
    'uglify',
    // 'rev',
    // 'usemin',
    // 'requirejs:dist',
    // 'htmlmin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
