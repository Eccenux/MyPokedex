<?php
	/**
		A simple CSS/LESS generator.
	*/

	//
	$spritesCount = 151;
	$spritesPerRow = 10;
	/*
	$spritesWidth = 128;
	$spritesHeight = 128;
	*/
	// down-sized
	$spritesWidth = 64;
	$spritesHeight = 64;
	
	//
	$rows = ceil($spritesCount / $spritesPerRow);
	$cols = $spritesPerRow;

	//
	$dex = 1;
 	for($ri = 0; $ri < $rows; $ri++)
	{
		for($ci = 0; $ci < $cols; $ci++)
		{
			$positionX = - $ci * $spritesWidth;
			$positionY = - $ri * $spritesHeight;
			echo "\n.pokemon-num$dex {background-position: ${positionX}px ${positionY}px}";
			// stop
			$dex++;
			if ($dex > $spritesCount) {
				break;
			}
		}
	}
?>