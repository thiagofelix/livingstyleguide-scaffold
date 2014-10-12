'use strict';

module.exports = function (grunt) {
  grunt.registerMultiTask('kssJson', function () {
    var kss = require('kss'),
        done = this.async(),
        options = this.options({ markdown: true });

    this.files.forEach(function (file) {
      file.src
      .forEach( function (filepath, index, files) {
        grunt.verbose.write('parsing ' + filepath + ' ');

        kss.traverse(filepath, options, function (err, styleguide) {
          if (err) {
            grunt.fatal(err.message);
            done(false);
          };

          grunt.verbose.ok();

          var jsonContent = {
            files: styleguide.data.files,
            sections: []
          };

          styleguide.section().forEach(function (section) {
            grunt.verbose.write(section.data.header + ' ');
            jsonContent.sections.push({
              header: section.data.header,
              description: section.data.description,
              // modifiers: section.data.modifiers,
              markup: section.data.markup,
              reference: section.data.reference,
              refDepth: section.data.refDepth,
              deprecated: section.data.deprecated,
              experimental: section.data.experimental
            });
            grunt.verbose.ok();
          });


          grunt.file.write(file.dest, JSON.stringify(jsonContent));

          if (index == files.length - 1) {
            done(true);
          };
        });
      });
    });

  });
}
