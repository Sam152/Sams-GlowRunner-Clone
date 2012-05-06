/*
 * Our runner fellow.
 */
function Runner(lineColors){

	//The current position of our runner
	var position = new Point(100, 100);

	//Get the dimensions of our runner, store in a Point just because
	var dimensions = new Point(45, 45);
	
	//The possible states we can be in
	var states = {
		RUNNING : 0,
		JUMPING : 1
	};
	
	//Set the intial state
	var state = states.RUNNING;

	//The color of our runner man
	var color = lineColors[0];

	//The strength of gravity
	var gravity = 1;
	
	//The velocity of our runner
	var velocity = 0;
	
	//The maximum value velocity can reach
	var terminalVelocity = 3;

	//Set the maximum jump height of our runner
	var jumpHeight = 20;

	return {
		
		tick : function(lines){
	
			var standingOnALine = this.isStandingOnLine(lines);
	

			if(standingOnALine){
				
				velocity = 0;	
			
			}else{
			
				//Always add gravity to our velocity
				velocity += gravity;
			
				//Add our velocity to our runner
				position.add(new Point(0, velocity));

			}
		
		},
		
		//Check if we are standing on a set of lines
		isStandingOnLine : function(lines){
		
			var standingOnALine = false;
			
			//Define a hit area for our line vertically
			var yHitAreaTop = position.getY() + dimensions.getY();
			
			//Since we can move terminalVelocity units maximum per tick,
			//make sure our hit area encompasses this value.
			var yHitAreaBottom = yHitAreaTop + terminalVelocity;
	
			//Loop through each line to see if we are standing on it
			lines.forEach(function(line, index){
				
				//Get the position of our line
				var linePosition = line.getPosition();

				//Check we are standing on a line
				if(
					//Make sure our runner matches the lines color
					line.getColor() == color
					
					//Make sure we are within X range of the line
					&&
						(
							//Make sure we can jump onto a platform from the front of our man
							linePosition[0].getX() < position.getX()
							//And only fall off from the back our man
							|| linePosition[0].getX() < position.getX() + dimensions.getX()
						)
						
					
					//Fall off the edge of lines from the back
					&& linePosition[1].getX() > position.getX()
	
					//Make sure we are standing on the line vertically
					&& linePosition[0].getY() >= yHitAreaTop
					&&  linePosition[0].getY() <= yHitAreaBottom
				){
					//Make sure the rest of our scripts know we are standing on a line
					standingOnALine = true;
				}
			});

			return standingOnALine;

		},
		
		//Draw our runner man
		draw : function(){

			context.fillStyle = color;
			
			context.fillRect(
				position.getX(),
				position.getY(),
				dimensions.getX(),
				dimensions.getY()
			);

		},
	};
}
