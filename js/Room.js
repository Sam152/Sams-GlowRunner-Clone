/*
 * The glow runner room.
 */
function Room(canvas){

	//The speed at which the elements in the room move
	var roomSpeed = 3;
	
	//The lines drawn on the room
	var lines = [];


	return {
		
		//Make the logic for the room work
		tick : function(){

			//Draw the room elements
			this.draw();

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
			context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		}
	};
}
