var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

/*************************PLAYER********************/
//object position values 
var xPos = canvas.width / 2;
var yPos = canvas.height - 30;

var radius = 10;

//width height of a paddle 
var paddleH = 20,
    paddleW = 70,
    paddle = (canvas.width - paddleW) / 2;

//moving values 
var moveX = 2;
var moveY = -2;

//boolean if keyinput is pressed left or right
var leftPress = false;
var rightPress = false;

/********************BLOCKS**********************/

var blockRow = 9,
    blockColumn = 11,
    blockW = 40,
    blockH = 20,
    blockPadding = 10,
    offsetTop = 130,
    offsetLeft = 30;

    
  //2D array for the block's rows and columns 
var blocks = [];
for(var col=0; col <blockColumn; col++) 
{
    blocks[col] = [];
    for(var row=0; row <blockRow; row++) 
    {
        blocks[col][row] = { xPos: 0, yPos: 0, status: 1};
    }
}

/************************UI**************************/
var score = 0;

/****************************************************/




//add an event listener

document.addEventListener("keydown", moveDown, false);
document.addEventListener("keyup", moveUp, false);

//player key inputs 
function moveDown(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      rightPress = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPress = true;
  }
}

function moveUp(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      rightPress = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPress = false;
  }
  
}
function collsionDetect()
{
    for(var col = 0; col< blockColumn; col ++)
    {
        for(var row=0; row<blockRow; row ++)
        {
          //Condition - if the object(ball) intersects the coordinates of one of the blocks:
           //object x pos is > than block x pos
           //object x pos is < than block x pos + width and
           //object y pos is > than block y pos
           //object y pos is < than block y pos + height 
           //all of the above statements must be true in order to change the object's direction

            var blc = blocks[col][row];
            if(blc.status == 1 )
            {
                if( xPos > blc.xPos && xPos < blc.xPos + blockW && yPos > blc.yPos && yPos < blc.yPos + blockH)
                {   
                    moveY = -moveY;
                    blc.status = 0;
                    score++;
                    if(score == blockRow*blockColumn)
                    {
                        alert("You Win!")
                        {
                          document.location.reload();
                          clearInterval(intrerval);
                        }

                    }
                }
            }
        }
     }
}


//draw player function
function playerPong()
{
  //creating a circle 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(xPos, yPos, radius, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
 


  //have an object bounce off only 3 sides of the walls (left, right and top). If the object makes 
  //contact with the bottom wall the player loses the game 
  if(xPos + moveX > canvas.width-radius || xPos + moveX < radius) {
         
        moveX = -moveX;
    }
    
  if(yPos + moveY < radius) {
      moveY = -moveY;
    }
  else if (yPos + moveY > canvas.height-radius) 
    { 
      if(xPos > paddle && xPos < paddle + paddleW)
      {  
          moveY = -moveY;
      }
      else
        { alert("You Lose! Try Again");
          document.location.reload();
          clearInterval(interval);
      
      }

    }
  
  
    if(rightPress && paddle < canvas.width-paddleW) 
    {  paddle += 3;
      if(paddle + paddleW > canvas.width)
      {
       paddle = canvas.width - paddleW;
      }
    }
    else if(leftPress && paddle > 0) 
    {  paddle -= 3;
      if (paddle < 0)
        {
            paddle = 0;
        }
    }


  xPos += moveX;
  yPos += moveY;
  blockDraw();
  paddleDraw();
  collsionDetect();
  scoreDraw();





  //canvasBG();
}


/*function canvasBG()


{
  document.body.style.background = "url('background.jpg') no-repeat center";
 
}

*/

//draw the padding
function paddleDraw()
{

  ctx.beginPath();
  ctx.lineWidth = "2";
  ctx.strokeStyle = "black"; 
  ctx.rect(paddle, canvas.height-paddleH, paddleW, paddleH);
  ctx.stroke();
  
  

}

//function drawing out blocks on the screen 
function blockDraw() {
    for(var col=0; col<blockColumn; col++) {
        for(var row=0; row<blockRow; row++) 
        {   if(blocks[col][row].status == 1 ) //if status is 1 draw blocks if 0 then the block has collided with an object
            {
              var blockX = (col*(blockW + blockPadding)) + offsetLeft;
              var blockY = (row*(blockH + blockPadding)) + offsetTop;
              blocks[col][row].xPos = blockX;
              blocks[col][row].yPos = blockY;
              ctx.beginPath();
              ctx.rect(blockX, blockY, blockW, blockH);
              ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 70%, 50%)'; 
              ctx.fill()
              ctx.stroke();
              ctx.closePath();
            }
        }
    }
}

//function for keeping track of score 
function scoreDraw()
{
  ctx.font = "18px, Georgia";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " +score, 8, 20);

}

var interval = setInterval(playerPong, 10);

