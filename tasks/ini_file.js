/*
 * grunt-ini-file
 *
 *
 * Copyright (c) 2014 Enrique Moreno Tent
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerTask('ini-file', 'for the lulz', function(key, newValue) {

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
