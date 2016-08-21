/**
	Updates app data from builder data.
*/
// settings
// app data folder
var exportPath = '../workdir/app/data/';

// tools mapping
var jsonTools = require("./builder.json.tools.js");
var saveJsData = jsonTools.saveJsData;

// data to save
var pgoData = {
	attacks : require('./data/attacks.json'),
	pokedex : require('./data/pokedex-with-attacks.json')
}

for (name in pgoData) {
	saveJsData(pgoData[name]
		, 'pgoData.' + name
		, exportPath + name + '.js'
	);
}