var PaneControl = function(x, y, width, height){
	this.Color = null;
	this.BgColor = null;
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
	
	this.contains = function(x, y){
		var result = (x >= this.X && x <= (this.X + this.Width) && y >= this.Y && y <= (this.Y + this.Height));
		return result;
	}
	
	this.draw = function(){
		fill(this.BgColor);
		rect(this.X, this.Y, this.Width, this.Height);
		
		stroke(this.Color);		
		rect(this.X, this.Y, this.Width, this.Height);
	}
}