var Block = function(row, column){
	this.Row = row;
	this.Column = column;
}

var Board = function(width, height){
	this.Width = width;
	this.Height = height;
	this.Blocks = [];
	
	for (var r = 0; r < Width; r++){
		for (var c = 0; c < Column; c++){
			var b = new Block(r, c);
			this.Blocks.Push(b);
		}
	}
}

var Unit = function(id, type, row, column, team){
	this.Type = type;
	this.Id = id;
	this.Row = row;
	this.Column = column;
	this.Team = team;
}

var Camp = function(id, row, column, team){
	var unit = new Unit(id, "Camp", row, column, team);
	unit.Hp = 5;
	unit.Speed = 0;
	unit.Range = 0;
	unit.CoolDown = 0;
	unit.MaxCoolDown = 0;
	
	return unit;
}

var Archer = function(id, row, column, team){
	var unit = new Unit(id, "Archer", row, column, team);
	unit.Hp = 2;
	unit.Speed = 3;
	unit.Range = 5;
	unit.CoolDown = 0;
	unit.MaxCoolDown = 4;
	
	return unit;
}

var Dagger = function(id, row, column, team){
	var unit = new Unit(id, "Dagger", row, column, team);
	unit.Hp = 3;
	unit.Speed = 4;
	unit.Range = 1;
	unit.CoolDown = 0;
	unit.MaxCoolDown = 2;
	
	return unit;
}

var Tanker = function(id, row, column, team){
	var unit = new Unit(id, "Tanker", row, column, team);
	unit.Hp = 5;
	unit.Speed = 2;
	unit.Range = 1;
	unit.CoolDown = 0;
	unit.MaxCoolDown = 2;
	
	return unit;
}

var Team = function(name){
	this.Name = name;
	this.Units = [];
}
