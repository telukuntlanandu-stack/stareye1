const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");

const box=20;
const canvasSize=400;
let score=0;
 
let snake=[]
let direction="RIGHT";
let food={}
let game=null;
let initialSpeed=300;
let ispaused=false;

const initGame=()=>{
    score=0;
    snake=[{x:9*box,y:10*box}];
    direction="RIGHT";
    food={
        x:Math.floor(Math.random()*(canvasSize/box))*box,
        y:Math.floor(Math.random()*(canvasSize/box))*box
    };
};


document.addEventListener("keydown",(evt)=>{
    if(evt.key==="ArrowLeft" && direction !=="RIGHT") direction="LEFT";
    else if(evt.key==="ArrowRight" && direction !== "LEFT") direction="RIGHT";
    else if(evt.key==="ArrowUp" && direction !== "DOWN") direction="UP";
    else if(evt.key==="ArrowDown" && direction !== "Up") direction="DOWN";
    else if(evt.code ==="Space"){
        ispaused=!ispaused;
    }
});

const drawGame=()=>{
    if(ispaused) return;

    ctx.fillStyle="#000";
    ctx.fillRect(0,0,canvasSize,canvasSize);

    for(i=0; i<snake.length; i++){
        ctx.fillStyle= i === 0 ? "#00ff00":"#00aa00";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

    }

    ctx.fillStyle="red";
    ctx.fillRect(food.x,food.y,box,box);

    let headX=snake[0].x;
    let headY=snake[0].y;

    if(direction==="LEFT") headX-=box;
    if(direction==="RIGHT") headX+=box;
    if(direction==="UP") headY-=box;
    if(direction==="DOWN") headY+=box;


    if(headX<0 ||
        headX>=canvasSize ||
        headY<0 ||
        headY>=canvasSize ||
        collision({x:headX,y:headY},snake)){
            clearInterval(game);
            alert("Game Over!!! Score:"+ score);
            return;
        }
    let newHead={x:headX,y:headY};

    if(headX===food.x && headY===food.y){
        score++;
        document.querySelector("#score").textContent=score;
        food = {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box
        };

        if(score%5 === 0 && score>50){
            speed-=10;
            clearInterval(game);
            game=setInterval(drawGame,speed);
        }
    }
    else{
        snake.pop();
    }
    snake.unshift(newHead);

}


const collision=(head,snakeArray)=>{
    for(let i=0; i<snakeArray.length; i++){
        if(head.x===snakeArray[i].x && head.y===snakeArray[i].y){
            return true;
        }
    }
    return false;
}

const startGame=(initialSpeed)=>{
    clearInterval(game);
    initGame();
    speed=initialSpeed;
    ispaused=false;
    game=setInterval(drawGame,speed);
}
