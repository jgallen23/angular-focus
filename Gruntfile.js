module.exports = function(grunt) {
  grunt.initConfig({
    info: grunt.file.readJSON('bower.json'),
    meta: {
      banner: '/*!\n'+
              ' * <%= info.name %> - <%= info.description %>\n'+
              ' * v<%= info.version %>\n'+
              ' * <%= info.homepage %>\n'+
              ' * copyright <%= info.copyright %> <%= grunt.template.today("yyyy") %>\n'+
              ' * <%= info.license %> License\n'+
              '*/\n'
    },
    jshint: {
      main: [
        'Gruntfile.js', 
        'bower.json',
        'lib/**/*.js',
        'test/*.js'
      ]
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: 'lib/angular-focus.js',
        dest: 'dist/angular-focus.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: 'dist/angular-focus.js',
        dest: 'dist/angular-focus.min.js'
      }
    },
    watch: {
      main: {
        files: '<%= jshint.main %>',
        tasks: 'default' 
      },
      ci: {
        files: [
          '<%= jshint.main %>',
          'test/index.html'
        ],
        tasks: ['default', 'mocha']
      }
    },
    mocha: {
      all: {
        src: 'test/index.html',
        options: {
          run: true
        }
      }
    },
    plato: {
      main: {
        files: {
          'reports': ['lib/*.js']
        }
      }
    },
    reloadr: {
      main: [
        'example/*',
        'test/*',
        'dist/*'
      ]
    },
    connect: {
      server:{
        port: 8000,
        base: '.'
      },
      plato: {
        port: 8000,
        base: 'reports',
        options: {
          keepalive: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  //grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-reloadr');
  grunt.loadNpmTasks('grunt-plato');
  grunt.registerTask('default', ['jshint', 'concat', 'uglify' ]);
  grunt.registerTask('dev', ['connect:server', 'reloadr', 'watch:main']);
  grunt.registerTask('ci', ['connect:server', 'watch:ci']);
  grunt.registerTask('reports', ['plato', 'connect:plato']);
};
