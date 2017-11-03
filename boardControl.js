var BoardControl = function(x, y, width, height, blockWidth, blockHeight){
	this.X = x;
	this.Y = y;
	this.BlockWidth = blockWidth;
	this.BlockHeight = blockHeight;
	this.Width = x + width * blockWidth;
	this.Height = x + height * blockHeight;
	this.BlockControls = [];
	this.CharControls = [];
	
	
	this.BlockBorderColor = null;	
	this.NormalBlockFillColor = null;
	this.UpperSelectedFillColor = null;	
	this.UpperMovableFillColor = null;
	this.LowerSelectedFillColor = null;
	this.LowerMovableFillColor = null;
	this.AttackableFillColor = null;
	
	this.UpperCampImg = null;
	this.UpperArcherImg = null;
	this.UpperTankerImg = null;
	this.UpperDaggerImg = null;
	
	this.LowerCampImg = null;
	this.LowerArcherImg = null;
	this.LowerTankerImg = null;
	this.LowerDaggerImg = null;
	
	
	//generate block controls
	for (var r = 0; r < height; r++){
		for(var c = 0; c < width; c++){
			var blkControl = new BlockControl(x + c * blockWidth, y + r * blockHeight, blockWidth, blockHeight);
			this.BlockControls.push(blkControl);
		}
	}
	
	
	this.databind = function(model){
		
	}
	
	this.getColor = function(blockCtrl){
		if (blockCtrl.State == "Empty") return this.NormalBlockFillColor;
		else if (blockCtrl.State == "UpperSelected"){
			return this.UpperSelectedFillColor;
		} else if (blockCtrl.State == "UpperMovable") {	
			return this.UpperMovableFillColor;
		} else if (blockCtrl.State == "LowerSelected") {
			return this.LowerSelectedFillColor;
		} else if (blockCtrl.State == "LowerMovable") {			
			return this.LowerMovableFillColor
		} else {
			this.AttackableFillColor;
		}
	}

	this.draw = function(){
		for	(var i = 0; i < this.BlockControls.length; i++){
			this.BlockControls[i].Color = this.BlockBorderColor;
			var fillColor = this.getColor(this.BlockControls[i]);
			this.BlockControls[i].BgColor = fillColor;
			this.BlockControls[i].draw();
		}			
	}
	
	this.clearState = function(){
		for	(var i = 0; i < this.BlockControls.length; i++){
			this.BlockControls[i].State = "Empty";
		}
	}
	
	this.contains = function(x, y){
		return(x >= this.X && x <= this.Width && y >= this.Y && y <= this.Height);
	}
	
	this.clickedAt = function(x, y){
		var col = Math.floor((x - this.X) / this.BlockWidth);
		var row = Math.floor((y - this.Y) / this.BlockHeight);
		return [row, col];
	}
}