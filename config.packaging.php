<?php
/**
 * This application extra configuration file.
 *
 * This file is included after basic configuration found in _packaging/config.php
 * If empty default packaging config will be used.
 */

//==========================================
// Your paths
//==========================================
// Android test build (optional)
//$strTestBuildRoot = '_builds/phonegap-android-project/assets/www/';

//==========================================
// Your packages definitions
//
// Note! Replace only things you wish to change in default configuration.
//==========================================
/*
	Some examples

// append extra source css (`colors.css`) to common css package
$buildPackages['css']['packages']['common']['src'][] = 'colors';

// replace source files configuration for `index` package
$buildPackages['app']['packages']['index']['src'] = array(
	// classes and helpers
	'external-libraries/*',
	// session management
	'session/libraries/*',
	'session/controllers/*',
	// other
	'controllers/*',
	'proxies/*',
);
/**/
// append data to common JS package
$buildPackages['app']['packages']['common']['src'][] = 'data/*';

// append extra css to common css package
$buildPackages['css']['packages']['common']['src'][] = 'types';
$buildPackages['css']['packages']['common']['src'][] = 'pokemons';
$buildPackages['css']['packages']['common']['src'][] = 'attacks';

// replace extra libs for index
$buildPackages['libs']['packages']['index']['src'] = array();

?>