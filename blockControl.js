var BlockControl = function(x, y, width, height) {
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
	
	this.State = "Empty"; // "Selected", "Movable", "Attackable"
	
	this.Color = null;
	this.BgColor = null;
	
	this.Control = new PaneControl(x, y, width, height);
	
	this.draw = function(){
		this.Control.X = this.X;
		this.Control.Y = this.Y;
		this.Control.Color = this.Color;
		this.Control.BgColor = this.BgColor;
		this.Control.draw();
	}
	
	this.contains = function(x, y){
		this.Control.X = this.X;
		this.Control.Y = this.Y;
		return this.Control.contains(x, y);
	}
}