/*
 * The glow runner application.
 */
function GlowRunner(){
	
	//Some application constants
	var canvas = document.getElementById('glow-runner');
	var framerate = 30;
	
	return {
		
		//Kick the game off		
		start : function(){

			//Keep the game loop going
			while(true){
				
				//Time the frame started
				var frameStart = (new Date).getTime();			
			
			}

			
		},
		tick : function(){
		
		
		}
	};
}


//Start the game when the window loads
window.onload = function(){
	var game = (new GlowRunner()).start();
}

