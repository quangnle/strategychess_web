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

function preload() {
	_upperCampImg = loadImage("imgs/Camp_Blue.png");
	_upperArcherImg = loadImage("imgs/Archer_Blue.png");
	_upperTankerImg = loadImage("imgs/Tanker_Blue.png");
	_upperDaggerImg = loadImage("imgs/Dagger_Blue.png");
	
	_lowerCampImg = loadImage("imgs/Camp_Green.png");
	_lowerArcherImg = loadImage("imgs/Archer_Green.png");
	_lowerTankerImg = loadImage("imgs/Tanker_Green.png");
	_lowerDaggerImg = loadImage("imgs/Dagger_Green.png");
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
	
}

function mouseClicked(){
	if (mouseButton == LEFT) {
		if (_boardCtrl.contains(mouseX, mouseY)){
			_boardCtrl.onClicked(mouseX, mouseY);
		}
		else if (_gameInfoCtrl.contains(mouseX, mouseY)) {
			_gameInfoCtrl.clickedAt(mouseX, mouseY);
		}
	} else if (mouseButton == RIGHT){
		console.log(mouseX + " " + mouseY);
	}
}

function doubleClicked() {
	
}