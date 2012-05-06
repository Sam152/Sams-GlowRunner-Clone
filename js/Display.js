/*
 * Creates display logic to be shown on the screen
 */

function Display(){

	//A color guide to show which directions do what colors
	var colorGuide = new Sprite('/assets/images/color-guide.png', 100);
	
	//The background image of our Room
	var backgroundImage = new Sprite('/assets/images/background.png', 479);


	return {
		
		//Our draw function to render all our page display elements
		draw : function(lines, runner){
		
			//Draw the background image
			backgroundImage.draw(new Point(0,0), true);
			
			//Draw our lines on the screen
			lines.forEach(function(line, index){ line.draw(); });
			
			//Draw our man
			runner.draw();
			
			//Draw our color guide in the top right hand corner of the canvas
			colorGuide.draw(new Point(700,5));

		}
	};
}
