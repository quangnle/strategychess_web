var PictureBoxControl = function(x, y, width, height, img){
	this.Pane = new PaneControl(x, y, width, height);
	this.Img = img;
	
	this.draw = function(){
		this.Pane.draw();
		image(this.Img, this.Pane.X, this.Pane.Y);
	}
	
	this.contains = function(x, y){
		return this.Pane.contains(x, y);
	}
}