var jsdom = require("jsdom");	//  last used: jsdom version: "9.4.2"

// tools mapping
var tools = require("./builder.tools.js");
var strip = tools.strip;
var getCellText = tools.getCellText;

var jsonTools = require("./builder.json.tools.js");
var saveJson = jsonTools.saveJson;

/**
	Pokemon name to index mapping.
*/
function getPokemonNameIndexMapping() {
	var pokedex = require('./data/pokedex.json');
	var mapping = {};
	for (var i = 1; i < pokedex.length; i++) {
		mapping[pokedex[i].name] = i;
	}
	return mapping;
}

/**
	Change item (row).
*/
function buildChangesItem(item) {
	var cells = item.getElementsByTagName('td');
	return {
		pokemon: strip(cells[0].textContent),
		obsolete: strip(cells[1].textContent),
		introduced: strip(cells[2].textContent),
	}
}

/**
	Gather changes in given table.
*/
function gatherChanges(table, pokemonMapping) {
	// init items
	var items = table.querySelectorAll('tr');
	// ret.
	var data = [];

	// gather data
	for (var i = 1; i < items.length; i++) {
		var row = buildChangesItem(items[i]);
		// validate
		if (!(row.pokemon in pokemonMapping)) {
			throw new Error('Unknown pokemon: ' + row.pokemon);
		}
		// append index
		row.pokedex = pokemonMapping[row.pokemon]
		data.push(row);
	}
	return data;
}

/**
	Apply changes of given category.
*/
function applyChanges(changes, category, pokemonAttacks) {
	for (var i = 1; i < changes.length; i++) {
		var row = changes[i];
		var pokemon = pokemonAttacks[row.pokedex];
		if (row.introduced.length) {
			pokemon[category].push(row.introduced);
		}
		// create and update obsolete attacks list
		// obsolete = cannot be captured now, but can still be in possession of some players
		if (row.obsolete.length) {
			if (!('obsolete' in pokemon)) {
				pokemon.obsolete = {};
			}
			pokemon.obsolete[row.obsolete] = true;
		}
		if (row.introduced.length) {
			if (!('introduced' in pokemon)) {
				pokemon.introduced = {};
			}
			pokemon.introduced[row.introduced] = true;
		}
	}
}

/**
	Main.
*/
function gatherData() {
	// previous attacks
	var pokemonAttacks = require('./data/pokemon-attacks.json');
	var pokemonMapping = getPokemonNameIndexMapping();

	// changes
	var tables = document.querySelectorAll("table");
	var fastChanges = gatherChanges(tables[0], pokemonMapping);
	var chargeChanges = gatherChanges(tables[1], pokemonMapping);
	//console.log(chargeChanges);
	
	// apply changes
	applyChanges(fastChanges, 'fast', pokemonAttacks);
	applyChanges(chargeChanges, 'charge', pokemonAttacks);
	//console.log(pokemonAttacks);
	
	return pokemonAttacks;
}

//var pokemonMapping = getPokemonNameIndexMapping();
//console.log(pokemonMapping);

jsdom.env({
	file: 'tables/attack-update.html',
	done: function (err, window) {
		GLOBAL.document = window.document;
		var data = gatherData();
		saveJson(data, 'data/pokemon-attacks-updated.json');
	}
});
