/*
 * Create a line class that is to be rendered on the screen.
 */
function Line(){

	//The y position of the line
	var yPosition = 300;
	
	//The width of the line
	var lineWidth = 200;

	//Define a possition as an array of two points
	var position = [
		new Point(
			context.canvas.width,
			yPosition
		),
		new Point(
			context.canvas.width + lineWidth,
			yPosition
		)
	];


	return {
		
		//Get the y coordinate of the line
		getY : function(){
			
			//It doesn't matter which point is accessed as they have the same Y
			return position[0].getY();
		},
		
		//Get the length of the line
		getLength : function(){
			return lineWidth;
		},
		
		//Move the line based on an xOffset
		moveLine : function(xOffset){
		
			//For both positions add the xOffset
			position.forEach(function(positionComponent){
				
				//Generate a point object with the new offset
				var offset = new Point(xOffset, 0);
				
				//Add the offset to the component
				positionComponent.add(offset);
				
			});
		
		},
		
		//Tick the lines
		tick : function(){
			
			
			return true;
				
		},
		
		//Draw the line
		draw : function(){
		
			//Start drawing a path
			context.beginPath();

			//Set the color of the line
			context.strokeStyle = "rgba(225,0,0,0.9)";
			
			//Draw a line between the two points
			context.moveTo(position[0].getX(),position[0].getY());
			context.lineTo(position[1].getX(),position[1].getY());
			context.stroke();
		}
	}
}
