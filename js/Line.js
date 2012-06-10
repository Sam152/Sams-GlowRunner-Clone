/*
 * Create a line class that is to be rendered on the screen.
 */
function Line(lineDistance, lastLineY, lineColors){

	//The buffer of space to leave at the top of the canvas
	var topBuffer = 110;
	
	//The space to leave free at the bottom of the screen
	var bottomBuffer = 20;
	
	//The variance of the height of the line
	var lineYVariance = 100;
	
	//The minimum variance of a new platform
	var minLineYVariance = 30;
	
	//The line width variance
	var lineWidthVariance = 100;
	
	//The minimum line width
	var minLineWidth  = 150;

	//Variables for our contructor
	var yPosition, lineWidth, position, lineColor;


	//Construct the line object
	(function(){
	
		//If this is the initial first line to be drawn
		if(lineDistance === false && lastLineY === false){

			//Set the initial position to be on screen
			xPosition = 90;
			
			//Set the initial y position of the line
			yPosition = 200;
			
			//Use the first color in our array
			lineColor = lineColors[0];
			
			lineWidth = 600;
			
		}else{
	
			//Get a random variance to shove the line up or down
			var randomLineVariance = rand(-lineYVariance, lineYVariance);
			
			//Ensure our minLineYVariance is respected
			randomLineVariance +=
				(randomLineVariance < 0)
					? -minLineYVariance
					: minLineYVariance;
			
			//The y position of the line
			yPosition = lastLineY + randomLineVariance;

			//Define the color of our line
			lineColor = lineColors[rand(0,lineColors.length -1)];
	
			//Make sure the y position doesn't got off the bottom of the screen
			if(yPosition > context.canvas.height - bottomBuffer)
				//Reflect it's position back
				yPosition -= 1 * Math.abs(yPosition - (context.canvas.height - bottomBuffer));

			//If the y position it higher than the buffer
			if(yPosition < topBuffer)
				yPosition += 1 * (topBuffer - yPosition);

			//The width of a line
			lineWidth = rand(0, lineWidthVariance) + minLineWidth;
		
			//Start off screen
			xPosition = context.canvas.width;
		
		}

		//Define a possition as an array of two points
		position = [
			new Point(
				xPosition,
				yPosition
			),
			new Point(
				xPosition + lineWidth,
				yPosition
			)
		];

	})();


	return {
	
		//Run this code on each line every tick
		tick : function(roomSpeed, roomDistance){
		
			//Move the line the correct distance
			this.moveLine(roomSpeed);

		},
		
		//Get the y coordinate of the line
		getY : function(){
			
			//It doesn't matter which point is accessed as they have the same Y
			return position[0].getY();
		},
		
		//Get the position of the line
		getPosition : function(){
			return position;
		},
		
		//Get the color of the line
		getColor : function(){
			return lineColor;
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
		
		//Draw the line
		draw : function(){

			//Save our context
			context.save();
		
			//Start drawing a path
			context.beginPath();

			//Create a shadow blur
			context.shadowBlur = 20;

			//Set the color our our glow
			context.shadowColor = lineColor;

			//Set the color of the line
			context.strokeStyle = lineColor;

			//Set a cap on our lines to be round
			context.lineCap = 'round';
			
			//Set the line width
			context.lineWidth = 4;
			
			//Draw a line between the two points
			context.moveTo(position[0].getX(),position[0].getY());
			context.lineTo(position[1].getX(),position[1].getY());
			context.stroke();

			//When the line has completed drawing, restore our old context
			context.restore();

		},
		
		//Check if the line is off the screen
		isOutOfBounds : function(){
			//Is the second line component less than 0?
			return (position[1].getX() < 0);
		},

	}
}
