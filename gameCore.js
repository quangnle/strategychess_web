var GameCore = function(id, width, height){
	var self = this;
	
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
	
	this.getModel = function(){
		return [this.UpperTeam, this.LowerTeam, this.Board];
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
	
	this.onUnitMoved = function(unit){
		unit.Team.Movable = false;
		
		var tArr = [self.UpperTeam, self.LowerTeam];
		for (var t = 0; t < tArr.length; t++){
			for (var u = 0; u < tArr[t].Units.length; u++){
				if (tArr[t].Units[u].Type == "Archer"){
					var enemies = self.MatchLogic.getUnits(tArr[t].Units[u].Row, tArr[t].Units[u].Column, 1, self.MatchLogic.getOpponent(tArr[t].Units[u].Team));
					if (enemies != null && enemies.length > 0){
						tArr[t].Units[u].CoolDown = Math.min(tArr[t].Units[u].MaxCoolDown, tArr[t].Units[u].CoolDown + 2);
					}
				}
			}
		}
	}
	
	this.onUnitAttacked = function(unit, targets){
		for (var i = 0; i < targets.length; i++){
			if (targets[i].Hp <= 0){
				var deadUnit = targets[i];
				deadUnit.Row = -1;
				deadUnit.Column = -1;
			}
		}
		unit.CoolDown = unit.MaxCoolDown;
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
	
	this.updateCoolDown = function(team){
		for	(var i = 0; i <  team.Units.length; i++){
			if (team.Units[i].CoolDown > 0) team.Units[i].CoolDown--;
		}
	}
	
	this.next = function(){
		this.updateCoolDown(this.UpperTeam);
		this.updateCoolDown(this.LowerTeam);
		
		this.CurrentTeam.Movable = true;
		this.CurrentTeam = this.MatchLogic.getOpponent(this.CurrentTeam);		
	}
}