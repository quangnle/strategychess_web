var _blockWidth = 60;
var _blockHeight = 55;
var _gameCore = new GameCore(1, 10, 12);
var _boardCtrl = new BoardControl(5, 5, 10, 12, 60, 55);
var _gameInfoCtrl = new GameInfoControl(_boardCtrl.X + _boardCtrl.Width + 10, _boardCtrl.Y + 10, 180, 150);

function setup() {
	createCanvas(850, 700);
	
	_boardCtrl.BlockBorderColor = color(0, 0, 0);
	_boardCtrl.NormalBlockFillColor = color(255, 255, 255);
	
	_boardCtrl.UpperSelectedFillColor = color(30, 75, 157);	
	_boardCtrl.UpperMovableFillColor = color(195, 215, 235);
	_boardCtrl.LowerSelectedFillColor = color(25, 159, 59);
	_boardCtrl.LowerMovableFillColor = color(225, 251, 228);
	_boardCtrl.AttackableFillColor = color(255, 100, 100);
	
	this.UpperCampImg = loadImage("imgs/Camp_Blue.png");
	this.UpperArcherImg = loadImage("imgs/Archer_Blue.png");
	this.UpperTankerImg = loadImage("imgs/Tanker_Blue.png");
	this.UpperDaggerImg = loadImage("imgs/Dagger_Blue.png");
	
	this.LowerCampImg = loadImage("imgs/Camp_Green.png");
	this.LowerArcherImg = loadImage("imgs/Archer_Green.png");
	this.LowerTankerImg = loadImage("imgs/Tanker_Green.png");
	this.LowerDaggerImg = loadImage("imgs/Dagger_Green.png");
	
	_boardCtrl.draw();	
	
	_gameInfoCtrl.Pane.BgColor = color(255, 255, 255);
	_gameInfoCtrl.Pane.Color = color(0, 0, 0);
	_gameInfoCtrl.initButtons(this.LowerArcherImg, this.LowerTankerImg, this.LowerDaggerImg, this.LowerCampImg);
	_gameInfoCtrl.draw();
}

function draw() {
	
}

function mouseClicked(){
	if (mouseButton == LEFT) {
		if (_boardCtrl.contains(mouseX, mouseY)){
			
		}
	} else if (mouseButton == RIGHT){
		console.log(mouseX + " " + mouseY);
	}
}