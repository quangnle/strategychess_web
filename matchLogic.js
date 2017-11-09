var MatchLogic = function(board, upperTeam, lowerTeam){
	this.Board = board;
	this.Teams = []
	this.UpperTeam = upperTeam;
	this.LowerTeam = lowerTeam;
	this.Teams.push(upperTeam);
	this.Teams.push(lowerTeam);
	
	this.getOpponent = function(team){
		if (team.Name == upperTeam.Name) return lowerTeam;
		return upperTeam;
	}
	
	this.getBlock = function(row, col){
		for (var i = 0; i < board.Blocks.length; i++){
			if (board.Blocks[i].Row == row && board.Blocks[i].Column == col) return this.Board.Blocks[i];
		}
		
		return null;
	}
	
	this.getUnit = function(row, col){
		var result = [];
		for (var t = 0; t < this.Teams.length; t++){
			for (var u = 0; u < this.Teams[t].Units.length; u++){
				var unit = this.Teams[t].Units[u];
				if (unit.Row == row && unit.Column == col) return unit;
			}
		}
		
		return null;
	}
	
	this.getAllUnits = function(row, col, radius){
		var result = [];
		for (var t = 0; t < this.Teams.length; t++){
			for (var u = 0; u < this.Teams[t].Units.length; u++){
				var unit = this.Teams[t].Units[u];
				if ( !(unit.Row == row && unit.Column == col) && Math.abs(unit.Row - row) <= radius && Math.abs(unit.Column - col) <= radius){
					result.push(unit);
				}					
			}
		}
		return result;
	}
	
	this.getUnits = function(row, col, radius, team){
		var units = this.getAllUnits(row, col, radius);
		var result = [];
		if (units != null && units.length > 0){
			for (var i = 0; i < units.length; i++){
				if (units[i].Team.Name == team.Name) result.push(units[i]);
			}
		}
		return result;
	}	
	
	this.getMovableBlocks = function(row, col, radius){
		var dc = [0, -1, 1, 0];
		var dr = [-1, 0, 0, 1];
		
		var b = this.getBlock(row, col);
		if (b != null){
			b.Dist = 0; // set initial distance for origin block
			var result = [];
			
			var q = new Queue();
			q.enqueue(b);
			do {
				var block = q.dequeue();
				if (block.Dist < radius){
					for (var i = 0; i < 4; i++){
						var aBlock = this.getBlock(block.Row + dr[i], block.Column + dc[i]);
						if ((aBlock != null) && 
							(aBlock.Dist == null) && 
							(this.getUnit(aBlock.Row, aBlock.Column) == null)){
							aBlock.Dist = block.Dist + 1;
							q.enqueue(aBlock);
						}
					}
				}
				
				if (!(block.Row == row && block.Column == col))
					result.push(block);
			} while (!q.empty());
		}
		
		// reset blocks
		for (var i = 0; i < board.Blocks.length; i++){
			board.Blocks[i].Dist = null;
		}
		
		return result;
	}
}