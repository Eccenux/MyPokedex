var tools = require("./builder.json.tools.js");

// read JSON
var pokemonAttacks = require('./data/pokemon-attacks-updated.json');
var attacks = require('./data/attacks.json');

/**
	Checks if passed array of names is within global `attacks` object.
	@return {Number} Unknown names count (0 means it's OK).
*/
function checkAttackArray(attacksArray) {
	var unknown = 0;
	for (var iFast = 0; iFast < attacksArray.length; iFast++) {
		if (attacksArray[iFast] in attacks) {
			//console.log('OK', attacksArray[iFast]);
		} else {
			console.warn('Unknown attack: ', attacksArray[iFast]);
			unknown++;
		}
	}
	return unknown;
}

//
// Make sure attack names in the list match general attack list.
var unknownAttacksOccurances = 0;
for (var i = 1; i < pokemonAttacks.length; i++) {	// @note skipping 0 - its null
	unknownAttacksOccurances += checkAttackArray(pokemonAttacks[i].fast);
	unknownAttacksOccurances += checkAttackArray(pokemonAttacks[i].charge);
}
if (unknownAttacksOccurances > 0) {
	throw('There are unknown attacks ('+unknownAttacksOccurances+')! Fix this before doing merge.');
}

//
// Merge attacks into Pokemon data.
var pokedex = require('./data/pokedex.json');
var pokedexWithAttacks = [null];
for (var i = 1; i < pokedex.length; i++) {	// @note skipping 0 - its null
	pokedex[i].fast = pokemonAttacks[i].fast;
	pokedex[i].charge = pokemonAttacks[i].charge;
	pokedex[i].obsoleteAttacks = pokemonAttacks[i].obsolete;
	pokedex[i].introducedAttacks = pokemonAttacks[i].introduced;
}
// save merged data
tools.saveJson(pokedex, 'data/pokedex-with-attacks.json');