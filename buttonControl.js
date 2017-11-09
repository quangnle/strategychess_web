var ButtonControl = function(x, y, width, height, caption, img, bgColor, hoverColor, clickedColor){
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
	this.Caption = caption;
	this.Image = img;
	this.State = "normal";
	
	this.Pane = new PaneControl(x, y, width, height);
	
	this.getColor = function(){
		if(this.State == "normal"){
			return bgColor;
		} else if (this.State == "hover") {
			return hoverColor;
		} else {
			return clickedColor;
		}
	}
	
	this.draw = function(){
		this.Pane.BgColor = this.getColor();
		this.Pane.draw();
		
		if (this.Image != null)
			image(this.Image, this.X + 2, this.Y + 2);
		
		var size = (this.Height * 2 / 3);
		textSize(size);
		fill(color(0,0,0));
		text(this.Caption, this.X + this.Width / 2 - (this.Caption.length * size / 4), this.Y, this.Width, this.Height);
	}
	
	this.contains = function(x, y){
		return this.Pane.contains(x,y);
	}
}