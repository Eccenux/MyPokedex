var fs = require('fs');

module.exports = {
	jsonToString : jsonToString,
	saveJson : saveJson,
};

function jsonToString(obj) {
	return JSON.stringify(obj)
		.replace(/\},/g, '}\n,')
	;
}

function saveJson(obj, fileName) {
	fs.writeFile(fileName, jsonToString(obj), function (err) {
		if (err) return console.error(err);
		console.log('saved ', fileName);
	});
}