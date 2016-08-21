
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


		var html = tpl.main(getAttacks(item));
		$('.attacks-container', page)
			.empty()
			.html(html)
			.trigger('create')
		;
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
// EOC
	function getAttacks(pokemon)
	{
		var attacks = [];
		suplementAttacks(attacks, pokemon.fast, pokemon);
		suplementAttacks(attacks, pokemon.charge, pokemon);
		for (var i = 0; i < pokemon.fast.length; i++) {
		}
		return attacks;
	}
// EOC
	function suplementAttacks(attacks, attackNames, pokemon) {
		for (var i = 0; i < attackNames.length; i++) {
			if (attackNames[i] in pgoData.attacks) {
				var attack = $.extend({}, pgoData.attacks[attackNames[i]]);

				if (isStab(attack, pokemon)) {
					attack.dps *= pgoData.config.stabMultiplier;
					attack.hasStab = true;
				} else {
					attack.hasStab = false;
				}

				attack.obsolete = false;
				if ('obsoleteAttacks' in pokemon) {
					if (attack.name in pokemon.obsoleteAttacks) {
						attack.obsolete = true;
					}
				}

				attack.introduced = false;
				if ('introducedAttacks' in pokemon) {
					if (attack.name in pokemon.introducedAttacks) {
						attack.introduced = true;
					}
				}

				attacks.push(attack);
			} else {
				LOG.warn('Unknown attack: ', attackNames[i]);
			}
		}
	}
// EOC
	function isStab(attack, pokemon)
	{
		if (pokemon.type1 === attack.type
		 || pokemon.type2 === attack.type) {
			return true;
		}
		return false;
	}
// EOC
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
				+'<tr class="attack '
						+ (attack.category)
						+ ' ' + (attack.hasStab ? 'stab' : '')
						+ ' ' + (attack.obsolete ? 'obsolete' : '')
						+ ' ' + (attack.introduced ? 'introduced' : '')
					+ '">'
					+'<td>' + (attack.name) + '</td>'
					+'<td>' + (attack.category) + '</td>'
					+"<td><span class='type-"+attack.type+"'>"+attack.type+"</span></td>"
					+'<td>' + (attack.dps.toFixed(1)) + '</td>'
				+'</tr>'
			;
		}
	};

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