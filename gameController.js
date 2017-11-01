var GameController = function(id, width, height){
	this.Id = id;
	this.Width = width;
	this.Height = height;
	this.Board = new Board(width, height);
	this.Logics = [];
	
	this.register = function(teamName){
		if (!this.UpperTeam)
			this.UpperTeam = new Team(teamName);
		else
			this.LowerTeam = new Team(teamName);
	}
	
	this.getTeam = function(teamName){
		if (this.UpperTeam.Name == teamName) return this.UpperTeam;
		if (this.LowerTeam.Name == teamName) return this.LowerTeam;
		return null;
	}
	
	this.addUnit = function(type, row, col, teamName){
		var team = getTeam(teamName);
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
				team.Units[i] = id;
			}
		}
	}
	
	this.removeUnit = function(unit){
		var team = unit.Team
		for ( var i = 0; i < team.Units.length; i++){
			if (unit.Id == team.Units[i].Id){
				team.Units.slice(i, 1);
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
				if (tArr[t].Units[u].type == "Archer")
					unitLogic = new ArcherLogic(tArr[t].Units[u], matchLogic);
				else if (tArr[t].Units[u].type == "Tanker")
					unitLogic = new TankerLogic(tArr[t].Units[u], matchLogic);
				else if (tArr[t].Units[u].type == "Dagger")
					unitLogic = new DaggerLogic(tArr[t].Units[u], matchLogic);
				
				unitLogic.moved = this.onUnitMoved;
				unitLogic.attacked = this.onUnitAttacked;
			}
		}
	}
	
	this.getModel = function(){
		return [this.UpperTeam, this.LowerTeam, this.Board];
	}
	
	this.onUnitMoved = function(unit){
		var tArr = [this.UpperTeam, this.LowerTeam];
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
		
		if (this.Validate){
			this.Validate();
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
		
		if (this.Validate){
			this.Validate();
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
			this.SelectedLogic = GetLogic(unit);
		}
	}
	
	this.getAvailableMoves = function(){
		return this.SelectedLogic.getAvailableMoves();
	}
	
	this.getAvailableMoves = function(row, col){
		return this.SelectedLogic.getAvailableMoves(row, col);
	}
	
	this.getTargets = function(){
		return this.SelectedLogic.getTargets();
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