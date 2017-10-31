var GameController = function(id){
	this.Id = id;
	this.Logics = [];
	
	this.register = function(teamName){
	}
	
	this.ready = function(){
		this.MatchLogic = new MatchLogic(this.Board, this.UpperTeam, this.LowerTeam);
		this.CurrentTeam = this.LowerTeam;
		
		var unitLogic = null;
		for (var i = 0; i < this.UpperTeam.Units; i++){
			// create appropriate logic for each unit
			if (this.UpperTeam.Units[i].type == "Archer")
				unitLogic = new ArcherLogic(this.UpperTeam.Units[i], matchLogic);
			else if (this.UpperTeam.Units[i].type == "Tanker")
				unitLogic = new TankerLogic(this.UpperTeam.Units[i], matchLogic);
			else if (this.UpperTeam.Units[i].type == "Dagger")
				unitLogic = new DaggerLogic(this.UpperTeam.Units[i], matchLogic);
			
			unitLogic.moved = this.onUnitMoved;
			unitLogic.attacked = this.onUnitAttacked;
		}
		
		for (var i = 0; i < this.LowerTeam.Units; i++){
			// create appropriate logic for each unit
			if (this.LowerTeam.Units[i].type == "Archer")
				unitLogic = new ArcherLogic(this.LowerTeam.Units[i], matchLogic);
			else if (this.LowerTeam.Units[i].type == "Tanker")
				unitLogic = new TankerLogic(this.LowerTeam.Units[i], matchLogic);
			else if (this.LowerTeam.Units[i].type == "Dagger")
				unitLogic = new DaggerLogic(this.LowerTeam.Units[i], matchLogic);
			
			unitLogic.moved = this.onUnitMoved;
		}
	}
	
	this.onUnitMoved = function(unit){
		// check all rangers if there is enemy around then update cooldown
	}
	
	this.onUnitAttacked = function(unit, targets){
		// check all units if HP is 0 then fire dead event
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
	}
}