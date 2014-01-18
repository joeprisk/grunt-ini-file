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

	grunt.registerMultiTask('ini-file', 'Changing values to an INI file', function() {

		var data = this.data;

		var file = data.file;
		if (!grunt.file.exists(file)) {
			grunt.log.warn("File " + file + " does not exist");
			return false;
		}

		Object.keys(data.values).forEach(function(key) {
			var newValue = data.values[key];

			var regex = new RegExp("(" + key +")( *)=( *)(.*)","g");
			var src = grunt.file.read(file);

			src = src.replace(regex, function(match, key, spacesBefore, spacesAfter, value){
				return key + spacesBefore + "=" + spacesAfter + newValue;
			});

			grunt.file.write(file, src);
		});
	});
};
