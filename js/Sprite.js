/*
 * An HTML5 Sprite sheet. Allows a sprite sheet to be defined and accessed easily.
 * Sprites should be equal width apart and defined only horizontally. This would
 * be handy for rendering images with multiple states or an animation class.
 */
function Sprite (src, frameWidth) {

	//The state the current image is in
	var state = 0;
	
	//The image DOM element
	var image = new Image();
	
	//How much the image should be rotated by
	var imageRotation = 0;
	
	//A variable representing the total states a sprite can be in
	var totalStates = image.width / frameWidth;
	
	//Construct the sprite
	(function(){
		
		//Set the source of our image to the correct path
		image.src = src;
	
	})();

	return {
	
		//Draw our image on the screen
		draw : function(drawPoint, fullScreen){
			
			//The clipping coordinates of our image
			var sourceX = frameWidth * state;
			var sourceY = 0;
			
			//Check if we want the image to be full screen or not
			if(typeof fullScreen === 'undefined'){
				fullScreen = false;
			}

			//Save our context for later use
			context.save();
			
			//If we have to rotate our image
			if(imageRotation != 0){
				
				//Translate to the our position
				context.translate(drawPoint.getX(),drawPoint.getY());
				
				//Rotate
				context.rotate(imageRotation);
				
				//Change our draw point
				drawPoint.setX(-this.getWidth() / 2);
				drawPoint.setY(-this.getHeight() / 2);
			}

			//Select a destination width and height			
			var destinationWidth = frameWidth;
			var destinationHeight = image.height;
			
			//If we want to render the image full screen
			if(fullScreen){

				//Make the destination dimensions the entire canvas
				destinationWidth = context.canvas.width;
				destinationHeight = context.canvas.height;
			}


			//Call our canvas draw API
			context.drawImage(
				image,
				sourceX,
				sourceY,
				frameWidth,
				image.height,
				drawPoint.getX(),
				drawPoint.getY(),
				destinationWidth,
				destinationHeight
			);

			//Restore our previous context
			context.restore();

		},
		
		//Get the width of one of our frames
		getWidth : function(){
			return frameWidth;
		},
		
		//Get the height of one of our frames
		getHeight : function(){
			return image.height;
		},
		
		//Set the rotation of our image
		setRotation : function(inAngle){
			imageRotation = inAngle;
		}		
	};
}
