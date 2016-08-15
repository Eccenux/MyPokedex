<?php
	/**
		A simple LESS generator.
	*/

	//
	$spritesCount = 151;
	$spritesPerRow = 10;
	
	//
	$rows = ceil($spritesCount / $spritesPerRow);
	$cols = $spritesPerRow;

	//
	$dex = 1;
 	for($ri = 0; $ri < $rows; $ri++)
	{
		for($ci = 0; $ci < $cols; $ci++)
		{
			$positionX = - $ci;
			$positionY = - $ri;
			echo "\n.pokemon-num$dex {background-position: (${positionX} * @size) (${positionY} * @size)}";
			// stop
			$dex++;
			if ($dex > $spritesCount) {
				break;
			}
		}
	}
?>