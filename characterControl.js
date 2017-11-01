var CharacterControl = function(unit, x, y){
	this.Unit = unit;
	this.Image = null;
	this.X = x;
	this.Y = y;
	
	this.draw = function(){
		image(this.Image, this.X, this.Y);
	}
}