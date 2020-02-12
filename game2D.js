

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var deltaX = 0;
var deltaY = 0;

function drawTriangle() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // the triangle
    ctx.beginPath();
    ctx.moveTo(200 + deltaX, 100 + deltaY);
    ctx.lineTo(170 + deltaX, 150 + deltaY);
    ctx.lineTo(230 + deltaX, 150 + deltaY);
    ctx.closePath();
   
    // the outline
    ctx.lineWidth = 10;
    ctx.strokeStyle = "rgba(102, 102, 102, 1)";
    ctx.stroke();
   
    // the fill color
    ctx.fillStyle = "rgba(255, 204, 0, 1)";
    ctx.fill();

    //window.requestAnimationFrame(drawTriangle);
  }
drawTriangle();

 
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);
 
var keys = [];
 
function keysPressed(e) {
    // store an entry for every key pressed
    keys[e.keyCode] = true;
 
    // left
    if (keys[37]) {
      deltaX -= 2;
    }
 
    // right
    if (keys[39]) {
      deltaX += 2;
    }
 
    // down
    if (keys[38]) {
      deltaY -= 2;
    }
 
    // up
    if (keys[40]) {
      deltaY += 2;
    }
 
    e.preventDefault();
 
    drawTriangle();
}
 
function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
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


function drawCanvas()

{ 

block.update();
block.draw();

block1.update();
block1.draw();

block2.update()
block2.draw();

window.requestAnimationFrame(drawCanvas);

}

drawCanvas();



