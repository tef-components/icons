/*global module*/
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),

    // Creates embedded icon font
    webfont: {
      embedded: {
        src: 'source/*.svg',
        dest: 'fonts/',
        options: {
          font: 'icons',
          embed: 'woff,ttf,eot',
          engine: 'node',
          template: 'templates/style.css',
          htmlDemoTemplate: 'templates/index.html',
          templateOptions: {
            baseClass: '',
            classPrefix: '',
            mixinPrefix: ""
          }
        }
      }
    },

    rename: {
      css: {
        src: 'fonts/icons.css',
        dest: 'icons.css',
      },
      html: {
        src: 'fonts/icons.html',
        dest: 'index.html',
      }
    },

    clean: {
      fonts: 'fonts',
    },

    exec: {
      // add new files before commiting
      add: {
        command: 'git add .'
      },

      // push to gh-pages branch
      pages: {
        command: [
          'git checkout gh-pages',
          'git pull origin master',
          'git push origin gh-pages',
          'git checkout master'
        ].join('&&')
      }
    },

    bump: {
      options : {
        files: ['bower.json'],
        commitFiles: ["-a"],
        pushTo: 'origin'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-rename');


  grunt.registerTask('default', [
    'webfont:embedded',
    'rename',
    'clean'
  ]);

  grunt.registerTask('release', [
    'webfont:embedded',
    'rename',
    'clean',
    'exec:add',
    'bump',
    'exec:pages'
  ]);
};
