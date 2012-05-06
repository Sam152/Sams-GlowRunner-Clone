/*
 * The glow runner room.
 */
function Room(canvas){

	/*
	 * Mess with these for gameplay mechanics
	 */

	//The speed at which the room moves
	var roomSpeed = -12;

	//The upper limit of how far away platforms are from eachother
	var platformFrequencyVarianceUpper = 200;
	
	//The lower limit of how far away platforms are from eachother
	var platformFrequencyVarianceLower = -100;
	
	//Create an array of line colors
	var lineColors = [
		'#ff0',
		'#0f0',
		'#f00',
		'#00f'
	];


	/*
	 * Dont mess with these
	 */
	
	//Where x distance the room has travelled
	var roomDistance = context.canvas.width;

	//The x distance the lines cover
	var lineDistance = -context.canvas.width;
	
	//The initial seed for the line Y setting
	var lastLineY = 300;	
	
	//The lines drawn on the room
	var lines = [];

	//Create an initial line for us to run on
	lines[0] = new Line(false, false, lineColors);

	//Create our runner to run on our lines
	var runner = new Runner(lineColors);
	
	//Get the display object we are using the render various elements
	var display = new Display();
	

	return {
		
		//Make the logic for the room work
		tick : function(){
		
			//Add the rooms speed to the roomDistance
			roomDistance += roomSpeed;
		
			//todo, make all the elements of the room move roomSpeed units
			lines.forEach(function(line, index){ 

				//Tick the line
				line.tick(roomSpeed, roomDistance);
				
				//If the line has completed it's task
				if(line.isOutOfBounds()){
					//Remove it
					lines[index] = null;
					
					//Remove the first element of the array
					//Note, this will break if the lines do not function as a
					//conventional queue, ie first in first out. If this becomes
					//the case use Array.clean as defined in Utils.js
					lines = lines.splice(1);

				}

			});

			//While we don't have lines to cover the whole room
			if(-lineDistance > roomDistance){

				//Create a new line on the end of the array
				var newLineKey = lines.length;
				
				//Create a new line object
				lines[newLineKey] = new Line(lineDistance, lastLineY, lineColors);				

				//Add the lines length to the line distance
				lineDistance += 
					
					//Keep track of the amount of space lines have covered
					lines[newLineKey].getLength() 

					//Add a variance for overlapping and spreading apart platform
					+ rand(platformFrequencyVarianceLower, platformFrequencyVarianceUpper);			

				//Store the y position of the line
				lastLineY = lines[newLineKey].getY();
			}

			//Make our runner man work
			runner.tick(lines);

			//Draw all the elements of our room 
			display.draw(lines, runner);

		}
	};

}
