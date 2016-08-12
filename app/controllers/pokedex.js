/**
	@file controllers - pokedex

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
	 * Pokedex page.
	 */
	$mJ.controller.pokedex = function()
	{
		// list
		$mJ.makeList ('#page-pokedex', '#pokedex-list-container', pgoData.pokedex, {
			'listTextFunction' : listTextFunction,
			addActionButton : false
		});
	};

	function formatDexNumber(num)
	{
		var str = "" + num;
		var pad = "000";
		return pad.substring(0, pad.length - str.length) + str;
	}

	function listTextFunction(item)
	{
		return "\
			<h2>#" + formatDexNumber(item.number) + " " + item.name +"</h2>\
			<p>\
				<span class='type-"+item.type1+"'>"+item.type1+"</span>\
				<span class='type-"+item.type2+"'>"+item.type2+"</span>\
			</p>\
		";
	};
	
})(jQuery, window.mJappisApplication);