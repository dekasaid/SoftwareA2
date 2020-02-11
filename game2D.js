
    can = document.getElementById("myCanvas"),
    ctx = can.getContext("2d"),
    width = "1200",
    height = "700",

    player = {
        x : width/2,
        y : height - 5,
        width : 5,
        height : 5,
        movement : 2,
        speedx : 0,
        speedy : 0,
        jump : false

    },
    
    inputKey = [];

    can.width = width;
    can.height = height;
    setInterval(draw, 100);


function draw()
{
    //drawing the player 
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle ="blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

}

window.addEventListener("load", function()
{
    draw();
});
document.body.addEventListener("keydown", function(event){
    inputKey[event.keyCode] = true;
});

document.body.addEventListener("keyup", function(event){
    inputKey[event.keyCode] = false;
});

