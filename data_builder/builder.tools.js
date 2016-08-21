var pokemonTypes = [
	'bug',
	'dark',
	'dragon',
	'electric',
	'fairy',
	'fighting',
	'fire',
	'flying',
	'ghost',
	'grass',
	'ground',
	'ice',
	'normal',
	'poison',
	'psychic',
	'rock',
	'steel',
	'water',
]
var pokemonTypesRe = pokemonTypes.join('|');

module.exports = {
	getType : getType,
	strip : strip,
	getCellText : getCellText,
};

/**
	Strip whitespace.
*/
function strip(txt) {
	return txt.replace(/^\s+/, '').replace(/\s+$/, '')
}

/**
	Get pokemon type.
	
	@note checks if the is valid
	@note this is PGOdb sepcific
*/
function getType(cell) {
	var typeLink = cell.querySelector('a');
	if (!typeLink) {
		return '';
	}
	var type = typeLink.href.replace(/.+\/(.+?)-type.+/, '$1');
	if (!type.match(pokemonTypesRe)) {
		console.error("Incorrect type: ", type);
	}
	return type;
}

/**
	Get text from cells in the given range.
	
	@note Only non-empty cells are added.
*/
function getCellText(cells, startIndex, endIndex) {
	var texts = [];
	// defaults
	if (typeof(startIndex) != 'number' || startIndex > cells.length) {
		startIndex = 0;
	}
	if (typeof(endIndex) != 'number' || endIndex > cells.length) {
		endIndex = cells.length - 1;
	}
	// gather data
	for (var i = startIndex; i <= endIndex; i++) {
		var text = strip(cells[i].textContent);
		// skip empty
		if (text.length < 1) {
			continue;
		}
		texts.push(text);
	}
	return texts;
}

