/*
 * A simple object to manage playing sounds.
 */
function SoundManager(soundPath, soundFormat, initialVolume){

	return {
		play : function(soundName, inVolume, complete){

			//The volume this sound will be played at
			var volumeLevel;

			//Use the function parameter by default
			if(typeof inVolume !== "undefined"){
				volumeLevel = inVolume;
			}else{
				//Fall back to our objects default
				volumeLevel = initialVolume;
			}

			//Create an audio tag with the path to our file
			var audioElement = new Audio(soundPath + '/' + soundName + '.' + soundFormat);	

			//Set the volume
			audioElement.volume = parseFloat(volumeLevel / 100);

			//When the audio has loaded
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
					if(typeof complete == 'function'){
						//Run our callback
						complete();
					}
				},
				false
			);

		}
	};

}
