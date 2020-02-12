

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


function Player()
{
    //drawing out the player 
    ctx.beginPath();
    ctx.moveTo(200,100);
    ctx.lineTo(170,150);
    ctx.lineTo(230, 150);
    ctx.closePath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "purple";
    ctx.stroke();

    ctx.fillStyle = "orange";
    ctx.fill();

}


function Enemy(x, y)
{
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.direction = +1;
}

Enemy.prototype.draw = function()
{
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);

};

Enemy.prototype.update = function(){

    this.x = this.x + this.direction;
    if(this.x <=0 || this.x + this.width >= canvas.width)
    {
        this.direction *= -1;
    }
};





var block = new Enemy(20, 25);
var block1 = new Enemy(90, 40);
var block2 = new Enemy(280, 220);

function canvasUpdate()
{

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);


block.update();
block.draw();

block1.update();
block1.draw();

block2.update()
block2.draw();

Player();
window.requestAnimationFrame(canvasUpdate);
}

canvasUpdate();
