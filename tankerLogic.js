var TankerLogic = function(unit, matchLogic){
	this.Unit = unit;
	this.MatchLogic = matchLogic;
	
	this.move = function(row, col){
		var availMoves = this.getAvailableMoves();
		if (availMoves != null && availMoves.length > 0){
			for	(var i = 0; i < availMoves.length; i++){
				var block = availMoves[i];
				if (row == block.Row && col == block.Column){
					unit.Row = row;
					unit.Column = col;
					
					this.moved(unit);
					return true;
				}
			}
		}
		
		return false;
	}
	
	this.attack = function(row, col){
		if (unit.CoolDown == 0) {
			var targets = this.getTargets();
			if (targets != null && targets.length > 0){
				for (var i = 0; i < targets.length; i++){
					targets[i].Hp --;
				}
				
				this.attacked(unit, targets);
				return true;
			}	
		}
		return false;
	}
	
	this.getAvailableMoves = function(){
		var availMoves = matchLogic.getMovableBlocks(unit.Row, unit.Column, unit.Speed);
		return availMoves;
	}
	
	this.getAvailableMoves = function(row, col){
		var availMoves = matchLogic.getMovableBlocks(row, col, unit.Speed);
		return availMoves;
	}
	
	this.getTargets = function(){
		return this.getTargets(unit.Row, unit.Column);
	}
	
	this.getTargets = function(row, col){
		return matchLogic.getUnits(row, col, unit.Range, matchLogic.getOpponent(unit.Team));
	}
}