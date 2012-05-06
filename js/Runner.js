/*
 * Our runner fellow.
 */
function Runner(lineColors){

	/*
	 * Mess with these for gameplay mechanics
	 */

	//The strength of gravity
	var gravity = 2;
	
	//The upward velocity to add when jumping
	var jumpVelocity = -13;
	
	//The handtime of a jump in milliseconds
	var jumpHangtime = 350;

	//The maximum velocity we can fall at	
	var terminalVelocity = 15;
	

	/*
	 * Don't mess with these.
	 */
	
	//The active line that our runner was last standing on
	var activeLine;

	//The color of our runner man
	var color = lineColors[0];
	
	//A flag for if the user is holding down space
	var spaceDown = false;
	
	//A flag for if our runner is jumping
	var jumping = false;
	
	//Is this the first tick since the spacebar was pushed
	var movingUpward = false;
	
	//The time in which the hangtime of a jump ends
	var hangtimeEnd;

	//The current position of our runner
	var position = new Point(100, 10);

	//Get the dimensions of our runner, store in a Point just because
	var dimensions = new Point(45, 45);
	
	//The velocity of our runner
	var velocity = 0;
		
	//Construct our runner
	(function(){

		//When someone presses a key	
		window.addEventListener(
			'keydown',
			function(e){
		
				//Get they key binding that maps to a color
				var keyColorBinding = e.keyCode - 37;
				
				//If it exists in our array
				if(typeof lineColors[keyColorBinding] !== 'undefined'){
					//Set our color to the key that was pressed
					color = lineColors[keyColorBinding];
				}
				
				//If we push space
				if(e.keyCode == 32){

					//Set our flag to say we are holding space
					spaceDown = true;	
				}
			}
		);

		//When someone releases a key
		window.addEventListener(
			'keyup',
			function(e){
				//If we release space
				if(e.keyCode == 32){
					spaceDown = false;	
				}	
			}
		);

	})();

	return {
		
		tick : function(lines){

			//Find out if we are standing on a line or not	
			var standingOnALine = this.isStandingOnLine(lines);

			//If the user is trying to jump or moving upward	
			if(spaceDown && (standingOnALine || movingUpward)){
				
				//This is the first tick of a jump
				if(standingOnALine){

					//Set our flag to be moving upward
					movingUpward = true;
				
					//Set our initial velocity to be moving up
					velocity = jumpVelocity;
					
					//Set our jump to end when the time hits this point
					hangtimeEnd = (new Date()).getTime() + jumpHangtime;
				}					

				if((new Date()).getTime() < hangtimeEnd){
					velocity = jumpVelocity;
				}else{
					movingUpward = false;
				}

			
			}else{
				movingUpward = false;
			}
			
			
			//Always add gravity to our velocity
			velocity += gravity;
				
			//Make sure we don't piss off Newton
			if(velocity > terminalVelocity)
				velocity = terminalVelocity;
			
			//Add our velocity to our runner
			position.add(new Point(0, velocity));			
			
			if(standingOnALine && !movingUpward){

					//Stop our man from fallings
					velocity = 0;

					//Make our runner hug the line instead of stopping just above it
					position.setY(
						//Get the position of our last active line
						activeLine.getPosition()[0].getY()
					
						//Minus our runners height
						- dimensions.getY()
					);
			}
		
		},
		
		//Check if we are standing on a set of lines
		isStandingOnLine : function(lines){
		
			var standingOnALine = false;
			
			//Define a hit area for our line vertically
			var yHitAreaTop = position.getY() + dimensions.getY();
			
			//Since we can move terminalVelocity units maximum per tick,
			//make sure our hit area encompasses this value.
			var yHitAreaBottom = yHitAreaTop + ((velocity > 0) ? velocity + 1 : 0);
	
			//Loop through each line to see if we are standing on it
			lines.some(function(line, index){
				
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
					
					//Set the active line so we can use it later
					activeLine = line;
					
					//Halt execution of `some` by returning true
					return true;
					
				}
			});

			return standingOnALine;

		},
		
		//Draw our runner man
		draw : function(){

			//Set the color of our dude
			context.fillStyle = color;

			//A placeholder rect for now
			context.fillRect(
				position.getX(),
				position.getY(),
				dimensions.getX(),
				dimensions.getY()
			);

		},
	};
}
