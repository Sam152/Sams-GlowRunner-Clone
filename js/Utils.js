/*
 * Create the rand function to generate php style random numbers.
 */
function rand(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

/*
 * Clean a javascript array of certain elements.
 */
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

/*
 * Run a function a asynchronously.
 */
function async(func){
	setTimeout(func, 0);
}
