var GameInfoControl = function(x, y, width, height){
	this.Pane = new PaneControl(x, y, width, height);
	
	this.initButtons = function(archerImg, tankerImg, daggerImg, campImg){
		this.BtnSelectArcher = new PictureBoxControl(x + 5, y + 10, 55, 55, archerImg);
		this.BtnSelectTanker = new PictureBoxControl(x + 10 + 55, y + 10, 55, 55, tankerImg);
		this.BtnSelectDagger = new PictureBoxControl(x + 15 + 2*55, y + 10, 55, 55, daggerImg);
		this.BtnSelectCamp = new PictureBoxControl(x + 10 + 55, y + 15 + 55, 55, 55, campImg);	
	}
	
	this.contains = function(x ,y){
		return this.Pane.contains(x, y);
	}
	
	this.draw = function(){
		this.Pane.draw();
		this.BtnSelectArcher.Pane.BgColor = this.Pane.BgColor;
		this.BtnSelectArcher.Pane.Color = this.Pane.Color;
		this.BtnSelectArcher.draw();
		
		this.BtnSelectTanker.Pane.BgColor = this.Pane.BgColor;
		this.BtnSelectTanker.Pane.Color = this.Pane.Color;
	    this.BtnSelectTanker.draw();
		
		this.BtnSelectDagger.Pane.BgColor = this.Pane.BgColor;
		this.BtnSelectDagger.Pane.Color = this.Pane.Color;
        this.BtnSelectDagger.draw();
		
		this.BtnSelectCamp.Pane.BgColor = this.Pane.BgColor;
		this.BtnSelectCamp.Pane.Color = this.Pane.Color;
        this.BtnSelectCamp.draw();
	}
}