/*
 * A simple object to manage playing sounds.s
 *
 * @todo, rewrite so it's usable.
 */
function SoundManager(soundPath, initialVolume){

	var sounds = {
		background : {
			loop : true,
			file : 'backgroundmusic.mp3',
			volume : initialVolume
		},
		start : {
			loop : true,
			file : 'start.mp3',
			volume : initialVolume
		}
	};

	return {

		play : function(soundName, callback){

			//If the sound doesn't exist return
			if(typeof sounds[soundName] == 'undefined')
				return;
				
			//If the audioElement doesn't exist
			if(typeof sounds[soundName].audioElement == 'undefined')
				//Create it and attach it to the audio object
				sounds[soundName].audioElement = 
					new Audio(soundPath + '/' + sounds[soundName].file);			

			//Define a variable to access the audio element
			var audioElement = sounds[soundName].audioElement;
			
			//When the sound has loaded
			audioElement.addEventListener(
				'loadedmetadata',
				function(){

					//Play the sound
					audioElement.play();
				},
				false
			);
			
			//When the audio element has completed playing
			audioElement.addEventListener(
				'ended',
				function(){
					
					//If our callback is present
					if(typeof callback == 'function'){
						//Run our callback
						callback();
					}
					
					console.log('Playing');
					//If we are looping
					if(sounds[soundName].loop)
						this.play(soundName);
	
				},
				false
			);
		
		},

		//Stop a sound		
		stop : function(soundName){
			
			//Stop the sound from playing
			sounds[soundName].audioElement.stop();
			
			//Stop any looping
			sounds[soundName].loop = false;

		},
		
		//Set the looping status
		setLoopStatus : function(sound, loopStatus){
			
			//Set the loop property on the given sound
			sounds[soundName].loop = loopStatus;
		
		}
	};

}



