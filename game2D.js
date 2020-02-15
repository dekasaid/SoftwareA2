var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


//position values 
var xPos = canvas.width / 2;
var yPos = canvas.height - 30;

var radius = 10;


var paddleH = 20,
    paddleW = 50,
    paddle = (canvas.width - paddleW) / 2;

//moving values 
var moveX = 2;
var moveY = -2;

//boolean if keyinput is pressed left or right
var leftPress = false;
var rightPress = false;



//add an event listener

document.addEventListener("keydown", moveDown, false);
document.addEventListener("keyup", moveUp, false);


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

//draw player function
function PlayerPong()
{
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(xPos, yPos, radius, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();



  //have an object bounce off the walls
  if(xPos + moveX > canvas.width-radius || xPos + moveX < radius) {

      ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
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
    {
      paddle += 5;
      if (paddle + paddleW > canvas.width)
      {
          paddle = canvas.width - paddleW;
      }
    }
    else if(leftPress && paddle > 0) 
    {
        paddle -= 5;
        if (paddle < 0)
        {
            paddle = 0;
        }
    }


  xPos += moveX;
  yPos += moveY;
  paddleDraw();
  canvasBG();
}


/*function canvasBG()
{
  document.body.style.background = "url('starryBG.jpg') no-repeat center";
}
*/
function paddleDraw()
{


  ctx.beginPath();
  ctx.lineWidth = "3";
  ctx.strokeStyle = "purple"; // Green path
  ctx.rect(paddle, canvas.height-paddleH, paddleW, paddleH);
  ctx.stroke();
  

}

var interval = setInterval(PlayerPong, 10);

