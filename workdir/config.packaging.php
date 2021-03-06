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
// Output path (relative to $strBaseScriptDir)
$strBundleRoot = '../_builds/phonegap-build-bundel/';

// Android test build (optional)
//$strTestBuildRoot = '../_builds/phonegap-android-project/assets/www/';

// Website build (optional)
$strWebBuildRoot = '../_builds/website/';

// PhoneGap widget config file path (relative to $strBaseScriptDir)
$widgetConfigFilePath = 'config-PhoneGap.xml';

//==========================================
// Your packages definitions
//
// Note! Replace only things you wish to change in default configuration.
//==========================================
// append data to common JS package
$buildPackages['app']['packages']['common']['src'][] = 'data/*';

// append extra css to common css package
$buildPackages['css']['packages']['common']['src'][] = 'types';
$buildPackages['css']['packages']['common']['src'][] = 'pokemons';
$buildPackages['css']['packages']['common']['src'][] = 'attacks';

// replace extra libs for index
$buildPackages['libs']['packages']['index']['src'] = array();

?>