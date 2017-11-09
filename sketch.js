var _blockWidth = 60;
var _blockHeight = 55;
var _gameCore = new GameCore(1, 10, 12);
var _boardCtrl = new BoardControl(5, 5, 10, 12, _blockWidth, _blockHeight);
_boardCtrl.GameCore = _gameCore;
var _gameInfoCtrl = new GameInfoControl(_boardCtrl.X + _boardCtrl.Width + 10, _boardCtrl.Y + 10, 190, 200);

var _upperCampImg = null;
var _upperArcherImg = null;
var _upperTankerImg = null;
var _upperDaggerImg = null;

var _lowerCampImg = null;
var _lowerArcherImg = null;
var _lowerTankerImg = null;
var _lowerDaggerImg = null;

_gameInfoCtrl.onNextClicked = function (){
	_boardCtrl.GameCore.next();
}

function initChess(){
	_gameCore.register("Alice");	
	_gameCore.addUnit("Archer", 2, 2,_gameCore.UpperTeam.Name);
	_gameCore.addUnit("Archer", 2, 3,_gameCore.UpperTeam.Name);
	_gameCore.addUnit("Tanker", 0, 7,_gameCore.UpperTeam.Name);
	_gameCore.addUnit("Tanker", 1, 8,_gameCore.UpperTeam.Name);
	_gameCore.addUnit("Tanker", 2, 9,_gameCore.UpperTeam.Name);
	_gameCore.addUnit("Dagger", 1, 5,_gameCore.UpperTeam.Name);
	_gameCore.addUnit("Camp", 0, 5,_gameCore.UpperTeam.Name);
	_gameCore.addUnit("Camp", 0, 0,_gameCore.UpperTeam.Name);
	
	
	_gameCore.register("Bob");
	_gameCore.addUnit("Archer", 9, 2,_gameCore.LowerTeam.Name);
	_gameCore.addUnit("Archer", 9, 3,_gameCore.LowerTeam.Name);
	_gameCore.addUnit("Tanker", 10, 7,_gameCore.LowerTeam.Name);
	_gameCore.addUnit("Tanker", 11, 8,_gameCore.LowerTeam.Name);
	_gameCore.addUnit("Tanker", 9, 9,_gameCore.LowerTeam.Name);
	_gameCore.addUnit("Dagger", 11, 5,_gameCore.LowerTeam.Name);
	_gameCore.addUnit("Camp", 10, 5,_gameCore.LowerTeam.Name);
	_gameCore.addUnit("Camp", 10, 0,_gameCore.LowerTeam.Name);
	
	_gameCore.ready();
}

function preload() {
	_upperCampImg = loadImage("imgs/Camp_Blue.png");
	_upperArcherImg = loadImage("imgs/Archer_Blue.png");
	_upperTankerImg = loadImage("imgs/Tanker_Blue.png");
	_upperDaggerImg = loadImage("imgs/Dagger_Blue.png");
	
	_lowerCampImg = loadImage("imgs/Camp_Green.png");
	_lowerArcherImg = loadImage("imgs/Archer_Green.png");
	_lowerTankerImg = loadImage("imgs/Tanker_Green.png");
	_lowerDaggerImg = loadImage("imgs/Dagger_Green.png");
	
	_boardCtrl.UpperCampImg =   _upperCampImg;
	_boardCtrl.UpperArcherImg = _upperArcherImg;
	_boardCtrl.UpperTankerImg = _upperTankerImg;
	_boardCtrl.UpperDaggerImg = _upperDaggerImg;
	
	_boardCtrl.LowerCampImg =   _lowerCampImg;
	_boardCtrl.LowerArcherImg = _lowerArcherImg;
	_boardCtrl.LowerTankerImg = _lowerTankerImg;
	_boardCtrl.LowerDaggerImg = _lowerDaggerImg;
	
	initChess();
}

function setup() {
	createCanvas(850, 700);
	
	_boardCtrl.BlockBorderColor = color(0, 0, 0);
	_boardCtrl.NormalBlockFillColor = color(255, 255, 255);	
	
	_boardCtrl.UpperSelectedFillColor = color(30, 75, 157);	
	_boardCtrl.UpperMovableFillColor = color(195, 215, 235);
	_boardCtrl.LowerSelectedFillColor = color(25, 159, 59);
	_boardCtrl.LowerMovableFillColor = color(225, 251, 228);
	_boardCtrl.AttackableFillColor = color(255, 100, 100);
	_boardCtrl.draw();	
	
	_gameInfoCtrl.Pane.BgColor = color(255, 255, 255);
	_gameInfoCtrl.Pane.Color = color(0, 0, 0);
	_gameInfoCtrl.initButtons(_lowerArcherImg, _lowerTankerImg, _lowerDaggerImg, _lowerCampImg);
	_gameInfoCtrl.draw();
}

function draw() {
	_boardCtrl.draw();
	_gameInfoCtrl.draw();
}

function mouseMoved() {
	if (_gameInfoCtrl.contains(mouseX, mouseY)) {
		_gameInfoCtrl.mouseHover(mouseX, mouseY);
	} else {
		if (_gameInfoCtrl.BtnNext) {
			_gameInfoCtrl.BtnNext.State = "normal";
		}
	}
}

function mouseClicked(){
	if (mouseButton == LEFT) {
		if (_boardCtrl.contains(mouseX, mouseY)){
			_boardCtrl.onClicked(mouseX, mouseY);
		} else if (_gameInfoCtrl.contains(mouseX, mouseY)) {
			_gameInfoCtrl.clickedAt(mouseX, mouseY);
		} else {
			_gameInfoCtrl.BtnNext.State = "normal";
		}
	} 
}

function doubleClicked() {
	console.log(mouseX + " " + mouseY);
}