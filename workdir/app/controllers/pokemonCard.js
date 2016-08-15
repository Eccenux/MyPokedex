/**
	@file controllers - pokemon NPC card

	Copyright:  ©2016 Maciej "Nux" Jaros
	  License:  CC-BY or MIT
	            CC-BY: http://creativecommons.org/licenses/by/3.0/
	            MIT: http://www.opensource.org/licenses/mit-license 
*/

/**
 * @param {jQuery} $ jQuery object
 * @param {mJappisApplication} $mJ Main object of this application
 */
(function($, $mJ)
{
	//var LOG = new Logger('controller.settings');
	
	/**
	 * Controller.
	 * 
	 * @param {Object} parameters Parameters map.
	 */
	$mJ.controller.pokemonCard = function(parameters)
	{
		var item = getItem(parameters);
		var page = document.getElementById('page-pokemonCard');

		// not found?
		if (item == null) {
			$('.error-message', page).html($mJ.i18n.get('unexpected error'));
			$('.error-message', page).show();
			$('.post-validation-content', page).hide();
			return;
		} else {
			$('.error-message', page).hide();
			$('.post-validation-content', page).show();
		}

		// extra data
		item.type1Class = "type-"+item.type1;
		item.type2Class = "type-"+item.type2;
		item.imageClass = "pokemon-icon pokemon-num"+item.number;
		
		// binding
		var dataBinding = new DataBindings(page);
		dataBinding.bind(item);

		// attacks
		var html = tpl.main(getAttacks(item));
		$('.attacks-container', page)
			.empty()
			.html(html)
			.trigger('create')
		;
	};

	/**
	 * Get requested item.
	 * 
	 * @param {Object} parameters Parameters map.
	 * @returns {Object} Pokemon item.
	 */
	function getItem(parameters)
	{
		var item = null;
		try {
			var id = parseInt(parameters.id, 10);
			var item = pgoData.pokedex[id];
		} catch (e) {
			item = null;
		}
		return item;
	}

	/**
	 * Get this pokemon attacks.
	 *
	 * @param {Object} pokemon Pokemon item.
	 * @returns {Array} List of attacks.
	 */
	function getAttacks(pokemon)
	{
		var attacks = [];
		suplementAttacks(attacks, pokemon.fast, pokemon);
		suplementAttacks(attacks, pokemon.charge, pokemon);
		for (var i = 0; i < pokemon.fast.length; i++) {
		}
		return attacks;
	}
	/**
	 * Append attacks data with given names.
	 * 
	 * @param {Array} attacks List of attacks to suplement.
	 * @param {Array} attackNames Names array.
	 * @param {Object} pokemon Pokemon item (for stab calculation).
	 */
	function suplementAttacks(attacks, attackNames, pokemon) {
		for (var i = 0; i < attackNames.length; i++) {
			if (attackNames[i] in pgoData.attacks) {
				var attack = $.extend({}, pgoData.attacks[attackNames[i]]);	// clone
				if (isStab(attack, pokemon)) {
					attack.dps *= pgoData.config.stabMultiplier;
					attack.hasStab = true;
				} else {
					attack.hasStab = false;
				}
				attacks.push(attack);
			} else {
				LOG.warn('Unknown attack: ', attackNames[i]);
			}
		}
	}

	/**
	 * Check if attack is has STAB for given pokemon.
	 * 
	 * @param {Object} attack Attack item.
	 * @param {Object} pokemon Pokemon item.
	 * @returns {Boolean}
	 */
	function isStab(attack, pokemon)
	{
		if (pokemon.type1 === attack.type
		 || pokemon.type2 === attack.type) {
			return true;
		}
		return false;
	}

	/**
	 * Attacks template.
	 *
	 * @type Object
	 */
	var tpl = {
		render: function (items, renderer) {
			var html = '';
			for (var i = 0; i < items.length; i++) {
				html += renderer(items[i]);
			}
			return html;
		},
		main: function (attacks) {
			return ''
				+'	<table data-role="table" \n\
						data-mode="columntoggle" data-column-btn-text="' + $mJ.i18n.get('Columns...') + '" \n\
						class="ui-responsive table-stripe ui-shadow">'
				+'	  <thead>'
						+'<th data-priority_="">' + $mJ.i18n.get('Name')    + '</th>'
						+'<th data-priority="2">' + $mJ.i18n.get('Category') + '</th>'
						+'<th data-priority="1">' + $mJ.i18n.get('Type')    + '</th>'
						+'<th data-priority_="">' + $mJ.i18n.get('DPS')+ '*</th>'
				+'	  </thead>'
				+'	  <tbody>'
						+ tpl.render(attacks, tpl.attack)
				+'	  </tbody>'
				+  '</table>'
			;
		},
		attack: function (attack) {
			// {"Cross Chop":{"name":"Cross Chop","category":"Charge","type":"fighting","dps":30,"duration":2}
			return ''
				+'<tr class="attack ' + (attack.category) + ' ' + (attack.hasStab ? 'stab' : '') + '">'
					+'<td>' + (attack.name) + '</td>'
					+'<td>' + (attack.category) + '</td>'
					+"<td><span class='type-"+attack.type+"'>"+attack.type+"</span></td>"
					+'<td>' + (attack.dps.toFixed(1)) + '</td>'
				+'</tr>'
			;
		}
	};

})(jQuery, window.mJappisApplication);