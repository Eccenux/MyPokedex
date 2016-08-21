var fs = require('fs');

module.exports = {
	jsonToString : jsonToString,
	saveJson : saveJson,
	saveJsData : saveJsData,
};

function jsonToString(obj) {
	return JSON.stringify(obj)
		.replace(/\},/g, '}\n,')
	;
}

function saveText(text, fileName) {
	fs.writeFile(fileName, text, function (err) {
		if (err) return console.error(err);
		console.log('saved ', fileName);
	});
}

function saveJson(obj, fileName) {
	saveText(jsonToString(obj), fileName);
}

function saveJsData(obj, objectName, fileName) {
	saveText(objectName + ' = \n' + jsonToString(obj), fileName);
}