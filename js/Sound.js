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
		},
		electricity : {
			loop : true,
			file : 'electricity1.wav',
			volume : initialVolume
		},
		land : {
			loop : false,
			file : 'kraftfeld_aus.mp3',
			volume : initialVolume
		},
		dead : {
			loop : false,
			file : 'sg_explode.wav',
			volume : initialVolume
		}
	};

	return {

		play : function(soundName, callback){

			console.log('Playing ' + soundName);

			//If the sound doesn't exist return
			if(typeof sounds[soundName] == 'undefined')
				return;
				
			//If the audioElement doesn't exist
			if(typeof sounds[soundName].audioElement == 'undefined'){

				//Create it and attach it to the audio object
				sounds[soundName].audioElement =
					new Audio(soundPath + '/' + sounds[soundName].file);		

				//When the sound has loaded
				sounds[soundName].audioElement.addEventListener(
					'loadedmetadata',
					function(){
						//Play the sound
						sounds[soundName].audioElement.play();
					},
					false
				);

			}else{

				//The sound has already been loaded and defined, so we can call play
				sounds[soundName].audioElement.play();
			}

			
			//When the audio element has completed playing
			sounds[soundName].audioElement.addEventListener(
				'ended',
				function(){
					
					//If our callback is present
					if(typeof callback == 'function'){
						//Run our callback
						callback();
					}

					//If we are looping
					if(sounds[soundName].loop)
						//Start the sound from the begining
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
			//this.setLoopStatus(soundName, false);

		},
		
		//Set the looping status
		setLoopStatus : function(sound, loopStatus){
			
			//Set the loop property on the given sound
			sounds[soundName].loop = loopStatus;
		
		}
	};

}



