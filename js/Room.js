/*
 * The glow runner room.
 */
function Room(canvas){

	//The speed at which the elements in the room move
	var roomSpeed = -7;
	
	//Where x distance the room has travelled
	var roomDistance = context.canvas.width;

	//The x distance the lines cover
	var lineDistance = -context.canvas.width;
	
	//The initial seed for the line Y setting
	var lastLineY = 300;
	
	//The variance of the platform distance from eachother
	var platformFrequencyVariance = 100;
	
	//The lines drawn on the room
	var lines = [];

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
					
					console.log(lines);
				}

			});

			//While we don't have lines to cover the whole room
			if(-lineDistance > roomDistance){

				//Create a new line on the end of the array
				var newLineKey = lines.length;
				
				//Create a new line object
				lines[newLineKey] = new Line(lineDistance, lastLineY);				

				//Add the lines length to the line distance
				lineDistance += 
					
					//Keep track of the amount of space lines have covered
					lines[newLineKey].getLength() 
					
					//Add a variance for overlapping and spreading apart platform
					+ rand(-platformFrequencyVariance, 2 * platformFrequencyVariance);			

				//Store the y position of the line
				lastLineY = lines[newLineKey].getY();
			}

			//Draw the room
			this.draw();
			
			//Draw the lines
			lines.forEach(function(line){ line.draw(); });

		},
		
		//Draw the elements of the room
		draw : function(){

			//Render the background
			this.background();

		},

		//Render the background of the room
		background : function(){
			
			//Set the background color
			context.fillStyle = "#000";
			
			//Fill the background with that solid color
			context.fillRect(
				0,
				0,
				context.canvas.width,
				context.canvas.height
			);
		}
	};

}
