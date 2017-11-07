var BoardControl = function(x, y, width, height, blockWidth, blockHeight){
	this.X = x;
	this.Y = y;	
	this.BlockWidth = blockWidth;
	this.BlockHeight = blockHeight;
	this.Width = x + width * blockWidth;
	this.Height = x + height * blockHeight;
	this.BlockControls = [];
	
	this.GameCore = null;
	
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
			blkControl.Row = r;
			blkControl.Column = c;
			this.BlockControls.push(blkControl);
		}
	}
	
	this.getBlockControl = function(row, col) {
		for (var i = 0; i < this.BlockControls.length; i++){
			if (this.BlockControls[i].Row == row && this.BlockControls[i].Column == col)
				return this.BlockControls[i];
		}
		return null;
	}
	
	this.onClicked = function(mx , my){
		var x = this.X - mx;
		var y = this.Y - my;
		var col = Math.floor(x / this.BlockWidth);
		var row = Math.floor(y / this.BlockHeight);
		
		if (GameCore.State == "init") {
			
		} else if(GameCore.State == "playing") {
			var team = this.GameCore.CurrentTeam;
			var unit = this.GameCore.getUnit(row, col);
			if (unit.Team.Name == team.Name){
				if (unit != null) {
					this.GameCore.selectUnit(unit);
					var sBlock = this.GameCore.getBlockControl(row, col);
					sBlock.State = team.Label + "Selected";
					
					// update view area
					var moves = this.GameCore.getAvailableMoves();
					if (moves != null){
						for	(var i = 0; i < moves.length; i++){
							var b = this.GameCore.getBlockControl(moves[i].Row, moves[i].Column);
							b.State = team.Label + "Movable";
						}
					}
					
					// update target blocks
					var targets = this.GameCore.getTargets();
					if (targets != null){
						for (var i = 0; i < targets.length; i++){
							var b = this.GameCore.getBlockControl(moves[i].Row, moves[i].Column);
							b.State = "Attackable";
						}
					}
				} else {
					if (this.SelectedUnit != null) {
						this.GameCore.SelectedLogic.move(row, col);
						// update target blocks
						var targets = this.GameCore.getTargets();
						if (targets != null){
							for (var i = 0; i < targets.length; i++){
								var b = this.GameCore.getBlockControl(moves[i].Row, moves[i].Column);
								b.State = "Attackable";
							}
						}
					}
				}
			} else {
				if (this.GameCore.SelectedUnit != null){
					this.GameCore.SelectedLogic.attack(row, col);
				}
			}				
		} else{
			
		}
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
	
	this.getImage = function(unit){
		if (unit.Team.Label == "Upper"){
			if (unit.Type == "Archer") return this.UpperArcherImg;
			else if (unit.Type == "Tanker") return this.UpperTankerImg;
			else if (unit.Type == "Dagger") return this.UpperDaggerImg;
			else return this.UpperCampImg;
		} else {
			if (unit.Type == "Archer") return this.LowerArcherImg;
			else if (unit.Type == "Tanker") return this.LowerTankerImg;
			else if (unit.Type == "Dagger") return this.LowerDaggerImg;
			else return this.LowerCampImg;
		}
	}

	this.draw = function(){
		for	(var i = 0; i < this.BlockControls.length; i++){
			this.BlockControls[i].Color = this.BlockBorderColor;
			var fillColor = this.getColor(this.BlockControls[i]);
			this.BlockControls[i].BgColor = fillColor;
			this.BlockControls[i].drawBG();
		}			
		
		var model = _gameCore.getModel();
		// draw characters
		for (var j = 0; j < 2; j++){
			for (var i = 0; i < model[j].Units.length; i++){
				var unit = model[j].Units[i];
				var img = this.getImage(unit);
				var blockControl = this.getBlockControl(unit.Row, unit.Column);
				blockControl.drawCharacter(img);
				blockControl.drawBars(unit.Hp, unit.CoolDown);
			}
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
}