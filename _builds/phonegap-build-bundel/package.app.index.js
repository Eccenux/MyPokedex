
// pokedex.js, line#0

// EOC
// EOC
(function($, $mJ)
{
	//var LOG = new Logger('controller.settings');
// EOC
	$mJ.controller.pokedex = function()
	{

		$mJ.makeList ('#page-pokedex', '#pokedex-list-container', pgoData.pokedex, {
			'listTextFunction' : listTextFunction,
			'showItemUrlFunction' : function (item) {
				return '#page-pokemonCard?id='+ item.number;
			},
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
		return ""
			+"<div class='pokemon-icon pokemon-num"+item.number+"'></div>"
			+"<h2>#" + formatDexNumber(item.number) + " " + item.name +"</h2>"
			+"<p>"
				+"<span class='type-"+item.type1+"'>"+item.type1+"</span>"
				+(item.type2.length<1 ? "": "<span class='type-"+item.type2+"'>"+item.type2+"</span>")
			+"</p>"
		;
	};

})(jQuery, window.mJappisApplication);
// pokedex.js, EOF
// pokemonCard.js, line#0

// EOC
// EOC
(function($, $mJ)
{
	//var LOG = new Logger('controller.settings');
// EOC
	$mJ.controller.pokemonCard = function(parameters)
	{
		var item = getItem(parameters);
		var page = document.getElementById('page-pokemonCard');


		if (item == null) {
			$('.error-message', page).html($mJ.i18n.get('unexpected error'));
			$('.error-message', page).show();
			$('.post-validation-content', page).hide();
			return;
		} else {
			$('.error-message', page).hide();
			$('.post-validation-content', page).show();
		}


		item.type1Class = "type-"+item.type1;
		item.type2Class = "type-"+item.type2;
		item.imageClass = "pokemon-icon pokemon-num"+item.number;


		var dataBinding = new DataBindings(page);
		dataBinding.bind(item);
	};
// EOC
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
// pokemonCard.js, EOF
// settings.js, line#0

// EOC
// EOC
(function($, $mJ)
{
	//var LOG = new Logger('controller.settings');
// EOC
	$mJ.controller.settings = function(parameters)
	{
		var $thisForm = $('#settings-form');

		//


		var tmpFormData = $mJ.form.init('settings');


		var formData = formCreator (
		[
			$mJ.form.getElementOptions('language')
			,
			$mJ.form.startSet()
				,
				$mJ.form.startGroup('mainNavi', {collapsed:true})
					,
					$mJ.form.getElementOptions('mainNaviFormat')
					,
					$mJ.form.getElementOptions('mainNaviPosition')
				,
				$mJ.form.endGroup()
				,
				$mJ.form.startGroup('advanced', {collapsed:true})
					,
					$mJ.form.getElementOptions('pageTransitions')
				,
				$mJ.form.endGroup()
			,
			$mJ.form.endSet()
			,
			{
				type      : 'submit'
				,name     : 'settings-submit'
				,lbl      : $mJ.i18n.get("submit")
			}
		]);
		$mJ.form.close();


		$thisForm.html(formData);


		$thisForm.trigger( "create" );


		$('#settings-submit-btn')
			.unbind()
			.click(function()
			{
				$thisForm.submit();
				return false;
			})
		;


		$thisForm.validate({meta: "validation"});

		//

		$thisForm
			.unbind()
			.submit(function(event)
			{

				if (!$mJ.form.valid(this))
				{
					return false;
				}


				$mJ.storage.set('settings', tmpFormData);


				location.href = 'index.html';

				event.preventDefault();
				return false;
			})
		;
	};

})(jQuery, window.mJappisApplication);
// settings.js, EOF