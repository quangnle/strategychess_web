var GameCore = function(id, width, height){
	this.Id = id;
	this.Width = width;
	this.Height = height;
	this.Board = new Board(width, height);
	this.Logics = [];
	this.State = "init";
	this.MatchLogic = null;
	
	this.register = function(teamName){
		if (!this.UpperTeam){
			this.UpperTeam = new Team(teamName);
			this.UpperTeam.Label = "Upper";
		}
		else{
			this.LowerTeam = new Team(teamName);
			this.LowerTeam.Label = "Lower";
		}
	}
	
	this.getTeam = function(teamName){
		if (this.UpperTeam.Name == teamName) return this.UpperTeam;
		if (this.LowerTeam.Name == teamName) return this.LowerTeam;
		return null;
	}
	
	this.getUnit = function(row, col){
		return this.MatchLogic.getUnit(row, col);
	}
	
	this.addUnit = function(type, row, col, teamName){
		if ( this.State == "init") {
			var team = this.getTeam(teamName);
			if (team != null){
				var unit = null;
				var id = "";
				if (type == "Archer")
					unit = Archer(id, row, col, team);
				else if (type == "Dagger")
					unit = Dagger(id, row, col, team);
				else if (type == "Tanker")
					unit = Tanker(id, row, col, team);
				else
					unit = Camp(id, row, col, team);
				
				unit.Team = team;
				team.Units.push(unit);
				
				// update id
				for ( var i = 0; i < team.Units.length; i++){
					var id = this.Id + "_" + teamName + "_" + (i + 1);
					team.Units[i].Id = id;
				}
			}
		}
	}
	
	this.removeUnit = function(unit){
		if ( this.State == "init") {
			var team = unit.Team
			for ( var i = 0; i < team.Units.length; i++){
				if (unit.Id == team.Units[i].Id){
					team.Units.slice(i, 1);
				}
			}
		}
	}
	
	this.ready = function(){
		this.MatchLogic = new MatchLogic(this.Board, this.UpperTeam, this.LowerTeam);
		this.CurrentTeam = this.LowerTeam;
		
		var unitLogic = null;
		
		var tArr = [this.UpperTeam, this.LowerTeam];
		for (var t = 0; t < tArr.length; t++){
			for (var u = 0; u < tArr[t].Units.length; u++){
				var unit = tArr[t].Units[u];
				if (unit.Type == "Archer")
					unitLogic = new ArcherLogic(tArr[t].Units[u], this.MatchLogic);
				else if (unit.Type == "Tanker")
					unitLogic = new TankerLogic(tArr[t].Units[u], this.MatchLogic);
				else if (unit.Type == "Dagger")
					unitLogic = new DaggerLogic(tArr[t].Units[u], this.MatchLogic);
				
				if (unitLogic != null){
					unitLogic.moved = this.onUnitMoved;
					unitLogic.attacked = this.onUnitAttacked;
					this.Logics.push(unitLogic);
				}
			}
		}
		
		this.State = "playing";
	}
	
	this.getModel = function(){
		return [this.UpperTeam, this.LowerTeam, this.Board];
	}
	
	this.onUnitMoved = function(unit){
		var tArr = [self.UpperTeam, self.LowerTeam];
		for (var t = 0; t < tArr.length; t++){
			for (var u = 0; u < tArr[t].Units.length; u++){
				if (tArr[t].Units[u].type == "Archer"){
					var enemies = this.MatchLogic.getUnits(unit.Row, unit.Column, 1, this.MatchLogic.getOpponent(unit.Team));
					if (enemies != null && enemies.length > 0){
						unit.CoolDown = Math.min(unit.MaxCoolDown, unit.CoolDown + 2);
					}
				}
			}
		}
	}
	
	this.onUnitAttacked = function(unit, targets){
		var tArr = [this.UpperTeam, this.LowerTeam];
		for (var t = 0; t < tArr.length; t++){
			for (var u = 0; u < tArr[t].Units.length; u++){
				if (tArr[t].Units[u].Hp <= 0){
					this.remove(tArr[t].Units[u]);
				}
			}
		}
	}
	
	this.getLogic = function(unit){
		for (var i = 0; i < this.Logics.length; i++){
			var logic = this.Logics[i];
			if (logic.Unit.Id == unit.Id) return logic;
		}
		
		return null;
	}
	
	this.selectUnit = function(unit){
		if (unit.Team.Name == this.CurrentTeam.Name){
			this.SelectedUnit = unit;
			this.SelectedLogic = this.getLogic(unit);
		}
	}
	
	this.getAvailableMoves = function(row, col){
		return this.SelectedLogic.getAvailableMoves(row, col);
	}
	
	this.getTargets = function(row, col){
		return this.SelectedLogic.getTargets(row, col);
	}
	
	this.attack = function(row, col){
		return this.SelectedLogic.attack(row, col);
	}
	
	this.next = function(){
		if (this.CurrentTeam == UpperTeam) this.CurrentTeam = this.LowerTeam;
		else this.CurrentTeam = this.UpperTeam;
	}
}