/*
 * grunt-ini-file
 *
 *
 * Copyright (c) 2014 Enrique Moreno Tent
 * E-mail: enriquemorenotent@gmail.com
 * URL: http://enriquemorenotent.com
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	grunt.registerTask('ini-file', 'Changing values to an INI file', function(key, newValue) {

		if (arguments.length !== 2) {
			grunt.log.warn("Missing arguments");
			return false;
		}

		var file = "tasks/test.ini"
		if (!grunt.file.exists(file)) {
			grunt.log.warn("File " + file + " does not exist");
			return false;
		}

		var regex = new RegExp("(" + key +")( *)=( *)(.*)","g");
		var src = grunt.file.read(file);

		src = src.replace(regex, function(match, key, spacesBefore, spacesAfter, value){
			return key + spacesBefore + "=" + spacesAfter + newValue;
		});

		grunt.file.write(file, src);
	});
};
