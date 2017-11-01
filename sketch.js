var _blockWidth = 60;
var _blockHeight = 55;
var _gameController = new GameController(1, 10, 12);
var _boardCtrl = new BoardControl(5, 5, 10, 12, 60, 55);

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
	
	
}

function draw() {
	
}

function mouseClicked(){
	if (mouseButton == LEFT) {
		if (_boardCtrl.contains(mouseX, mouseY)){
			var pos = _boardCtrl.clickedAt(mouseX, mouseY);
			console.log(pos[0] + " " + pos[1]);
		}
	} else if (mouseButton == RIGHT){
		console.log(mouseX + " " + mouseY);
	}
}