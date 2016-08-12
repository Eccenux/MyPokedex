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
})(jQuery, window.mJappisApplication);