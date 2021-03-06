var BlockControl = function(x, y, width, height) {
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
	
	this.State = "Empty"; // "Selected", "Movable", "Attackable"
	
	this.Color = null;
	this.BgColor = null;
	
	this.Control = new PaneControl(x, y, width, height);
	
	this.drawBG = function(){
		this.Control.Color = this.Color;
		this.Control.BgColor = this.BgColor;
		this.Control.draw();
	}
	
	this.drawBars = function(hp, cd){
		// draw hp
		for (var i = 0; i < hp; i++){
			fill(color(250, 125, 125));
			rect(this.Control.X + 1, this.Control.Y + this.Height - (i + 1) * 4, 3, 3, 1);
		}
		
		// draw cooldown
		for (var i = 0; i < cd; i++){
			fill(color(125, 125, 250));
			rect(this.Control.X + 5, this.Control.Y + this.Height - (i + 1) * 4, 3, 3, 1);
		}
	}
	
	this.drawCharacter = function(im){
		image(im, this.X + 4, this.Y);
	}
	
	this.contains = function(x, y){
		return this.Control.contains(x, y);
	}
}