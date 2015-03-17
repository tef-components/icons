/*global module*/
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),

    webfont: {

      // Creates a stylesheet with embedded font
      embedded: {
        src: 'source/*.svg',
        dest: './',
        options: {
          font: 'icons',
          embed: 'true',
          types: 'ttf',
          template: 'templates/style.css',
          htmlDemoTemplate: 'templates/index.html',
          templateOptions: {
            baseClass: '',
            classPrefix: '',
            mixinPrefix: ""
          }
        }
      },

      // Creates font files
      files: {
        src: 'source/*.svg',
        dest: 'fonts/',
        options: {
          font: 'icons',
          types: 'woff,ttf,eot',
        }
      }
    },

    clean: {
      css: 'fonts/icons.css',
      html: 'fonts/icons.html',
    },

    exec: {
      command: 'git add .'
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

  grunt.registerTask('default', [
    'webfont:files',
    'webfont:embedded',
    'clean',
    'exec',
    'bump'
  ]);
};
