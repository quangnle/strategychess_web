var BlockControl = function(x, y, width, height) {
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
	
	this.State = "Empty"; // "Selected", "Movable", "Attackable"
	
	this.Color = null;
	this.BgColor = null;
	
	this.draw = function(){
		fill(this.BgColor);
		rect(this.X, this.Y, this.Width, this.Height);
		
		stroke(this.Color);		
		rect(this.X, this.Y, this.Width, this.Height);
	}
	
	this.contains = function(x, y){
		return(x >= this.X && x <= this.Width && y >= this.Y && y <= this.Height);
	}
}