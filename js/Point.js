/*
 * Create a point class to represent a point in space
 */
function Point(x, y){

	return {
		
		//Get the X value of a point
		getX : function(){
			return x;
		},
		
		//Get the Y value of a point
		getY : function(){
			return y;
		}, 
		
		//Minus a point to this point 
		minus : function(point){
			
			x -= point.getX();
			y -= point.getY();
			
		},
		
		//Add a point to this point
		add : function(point){
			
			x += point.getX();
			y += point.getY();
			
		},
		
		//Get the distance between two points
		distance : function(point){

			return Math.ceil(sqrt(this.minus(point) + this.minus(point)));
		
		},
		
		//Override toString to be more descriptive
		toString : function(){
			return this.getX() + ', ' + this.getY();
		}
	};

}
