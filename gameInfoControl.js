var GameInfoControl = function(x, y, width, height){
	this.Pane = new PaneControl(x, y, width, height);
	this.SelectingType = null;
	
	this.initButtons = function(archerImg, tankerImg, daggerImg, campImg){
		this.BtnSelectArcher = new PictureBoxControl(x + 5, y + 10, 55, 55, archerImg);
		this.BtnSelectTanker = new PictureBoxControl(x + 10 + 55, y + 10, 55, 55, tankerImg);
		this.BtnSelectDagger = new PictureBoxControl(x + 15 + 2 * 55, y + 10, 55, 55, daggerImg);
		this.BtnSelectCamp = new PictureBoxControl(x + 10 + 55, y + 15 + 55, 55, 55, campImg);	
		this.BtnNext = new ButtonControl(x + 5, y + 25 + 2 * 55, width - 10, 55, "Next", null, color(120, 255, 120), color(60, 120, 60), color(20, 40, 20));
	}
	
	this.clickedAt = function(x, y){
		if (this.BtnSelectArcher.contains(x, y)){
			this.SelectingType = "Archer";			
		} else if (this.BtnSelectTanker.contains(x, y)) {
			this.SelectingType = "Tanker";
		} else if (this.BtnSelectDagger.contains(x, y)){
			this.SelectingType = "Dagger";
		} else if (this.BtnSelectDagger.contains(x, y)){
			this.SelectingType = "Camp";
		} else if (this.BtnNext.contains(x, y)) {
			this.BtnNext.State = "clicked";
			console.log("next clicked");
		} 
		
		console.log(this.SelectingType);
	}
	
	this.mouseHover = function(x, y){
		if (this.BtnNext.contains(x, y)) {
			this.BtnNext.State = "hover";
		} else {
			this.BtnNext.State = "normal";
		}
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
		
		this.BtnNext.Pane.BgColor = this.Pane.BgColor;
		this.BtnNext.Pane.Color = this.Pane.Color;
		this.BtnNext.draw();
	}
}