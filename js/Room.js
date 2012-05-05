/*
 * The glow runner room.
 */
function Room(canvas){

	//The speed at which the elements in the room move
	var roomSpeed = -3;
	
	//Where x distance the room has travelled
	var roomDistance = context.canvas.width;
	
	//The x distance the lines cover
	var lineDistance = 0;
	
	//The last Y position of the lines
	var lastLineY = 0;
	
	//The lines drawn on the room
	var lines = [];

	return {
		
		//Make the logic for the room work
		tick : function(){
		
			//Add the rooms speed to the roomDistance
			roomDistance += roomSpeed;
		
			//todo, make all the elements of the room move roomSpeed units
			lines.forEach(function(line){ 
				//Tick the line
				line.tick();
			
				//Add our room speed to the line
				line.moveLine(roomSpeed);
			});
			
			console.log(lines.length);


			//While we don't have lines to cover the whole room
			if(-lineDistance > roomDistance){
				
				//Create a new line on the end of the array
				var newLineKey = lines.length;
				
				//Create a new line object
				lines[newLineKey] = new Line(lineDistance, lastLineY);				

				//Add the lines length to the line distance
				lineDistance += lines[newLineKey].getLength() + 10;			
			
				//Store the y position of the line
				lastLineY += lines[newLineKey].getY();
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
