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

	var chalk = require('chalk');

	grunt.registerMultiTask('ini-file', 'Changing values to an INI file', function() {

		var data = this.data;

		var file = data.file;
		if (!grunt.file.exists(file)) {
			grunt.log.warn(chalk.red("File " + file + " does not exist"));
			return false;
		}

		// Read in the existing key values
		var src       = grunt.file.read(file),
			keyValues = stringToObject(src); // save into an object

		// For each updated key value
		Object.keys(data.values).forEach(function(key) {

			// update keyValues object
			keyValues[key] = data.values[key];

			grunt.log.writeln('ini value updated : ' + key + "=" + chalk.green(data.values[key]));

		});

		src = objectToString(keyValues);

		grunt.file.write(file, src);
		grunt.log.writeln('ini file saved    : ' + chalk.cyan(file));

	});

	function stringToObject(string) {

		// split by line breaks
		var rows = string.split("\r\n"),
			parts = {};

		rows.forEach(function(string) {
			var split = string.split("=");

			parts[split[0]] = split[1];
		});

		return parts;
	}

	function objectToString(object) {

		var strings = [];

		Object.keys(object).forEach(function(key) {

			if(key && object[key]) {
				strings.push(key + "=" + object[key]);
			}
		});

		return strings.join("\r\n");
	}
};
