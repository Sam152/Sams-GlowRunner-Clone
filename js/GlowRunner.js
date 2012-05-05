/*
 * The glow runner application.
 */
function GlowRunner(){
	
	//Some application constants
	var canvas = document.getElementById('glow-runner');
	var framerate = 30;

	var room = new Room(canvas);

	var _this;
	
	return {

		//Run the core code of the game
		tick : function(){
			
			//Make the room work			
			room.tick();
		
		},

		//Handle tick and framerate
		start : function(game){
			
			//Define _this
			if(typeof _this == 'undefined')
				_this = this;

			//Time the frame started
			var frameStart = (new Date).getTime();			
			
			//Render the next frame
			_this.tick();

			//Get the time taken for the frame to execute
			var frameTime = (new Date).getTime() - frameStart;

			//Set the next timeout based on the time we took
			var nextTimeout = (frameTime > framerate)
				? 0
				: framerate - frameTime;
							
			setTimeout(_this.start, nextTimeout);		
		}
	};
}


//Start the game when the window loads
window.onload = function(){

	(new GlowRunner()).start();
}
