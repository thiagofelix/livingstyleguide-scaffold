'use strict';
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.task.loadTasks('./tasks');

  grunt.initConfig({

    // Project metadata
    pkg: grunt.file.readJSON('package.json'),

    build: {
      name: 'styleguide',
      srcDir: './stylesheets',
      distDir: './dist',
      docsDir: './docs',
    },

    watch: {
      files: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= sass.options.paths %>/*.scss'
      ],
      tasks: ['kssJson:docs', 'sass:docs']
    },

    sass: {
      options: {
        loadPath: '<%= build.srcDir %>',
        banner: '/*! <%= build.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      docs: {
       src: '<%= build.srcDir %>/main.scss',
       dest: '<%= build.docsDir %>/app/css/<%= build.name %>.css'
      },
      dist: {
       src:  '<%= build.srcDir %>/main.scss',
       dest: '<%= build.distDir %>/css/<%= build.name %>.css'
      }
    },

    kssJson: {
      options: {
        includeType: 'sass',
        template:  '<%= build.template %>'
      },
      docs: {
        dest: '<%= build.docsDir %>/app/<%= build.name %>.json', 
        src: '<%= build.srcDir %>' 
      },
      dist: {
        dest: '<%= build.distDir %>/<%= build.name %>.json', 
        src: '<%= build.srcDir %>' 
      }
    },

    browserSync: {
      docs: {
        options: {
          startPath: 'app/index.html',
          open: true,
          watchTask: true,
          logLevel: 'debug',
          browser: ["google chrome"],
          server: {
            baseDir: '<%= build.docsDir %>'
          }
        },
        bsFiles: {
          src: ['<%= build.docsDir %>/**']
        }
      }
    },

    shell: {
      bower: {
        command: './node_modules/.bin/bower install -p'
      }
    },

    buildcontrol: {
      options: {
        commit: true,
        push: true,
        remote: 'git@github.com:thiagofelix/livingstyleguide-scaffold.git',
        connectCommits: false,
        // tag: '<%= pkg.version %>'
      },
      pages: {
        options: {
          dir: 'docs/app',
          branch: 'gh-pages'
        }
      }
    }
  });

  grunt.registerTask('work', ['docs', 'browserSync:docs', 'watch']);
  grunt.registerTask('docs', ['shell:bower', 'kssJson:docs', 'sass:docs']);
  // grunt.registerTask('publishDocs', ['docs', 'buildcontrol:pages']);
};
