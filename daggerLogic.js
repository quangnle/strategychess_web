var DaggerLogic = function(unit, matchLogic){
	this.Unit = unit;
	this.MatchLogic = matchLogic;
	
	this.move = function(row, col){
		var availMoves = this.getAvailableMoves(this.Unit.Row, this.Unit.Column);
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
					if (row == targets[i].Row && col == targets[i].Column){
						targets[i].Hp --;
						
						this.attacked(unit, [targets[i]]);
						return true;
					}
				}
			}	
		}
		return false;
	}
	
	this.getAvailableMoves = function(row, col){
		var availMoves = matchLogic.getMovableBlocks(row, col, unit.Speed);
		return availMoves;
	}
	
	this.getTargets = function(row, col){
		return matchLogic.getUnits(row, col, unit.Range, matchLogic.getOpponent(unit.Team));
	}
}