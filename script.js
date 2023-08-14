const paddleTop = document.getElementById("top");
const paddleBottom = document.getElementById("bottom");
const paddles = document.querySelectorAll(".paddle");

let topScore = 0; //score of top paddle
let bottomScore = 0; //score of bottom paddle
let startGame = false;
let ballCurrentX = window.innerWidth / 2;
let ballCurrentY = window.innerHeight / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
let isMovingLeft = false;
let isMovingRight = false;

if(localStorage.getItem("maxScore") <= 0){
  localStorage.setItem("name", "Player");
  localStorage.setItem("maxScore", -1);
}


localStorage.getItem("maxScore") <= 0 ? alert("You are playing for the first time") : alert(`Highest score is ${localStorage.getItem("maxScore")} by ${localStorage.getItem("name")}`);


//Adding event listener to the document element
document.addEventListener("keypress",(event) =>{
  if(event.key == "Enter"){
      if(!startGame){
        let rand = Math.random();
      if(rand>0.5){
        ballSpeedX = 4;
      }else{
        ballSpeedX = -4;
      }
  }

    startGame = true;
    runGame();
  }
} 
)

//function to reposition paddles to center of the screen
function bringPaddlestoCenter(){
    paddleTop.style.left = window.innerWidth/2 - paddleTop.clientWidth/2+ "px";
    paddleBottom.style.left = window.innerWidth/2 - paddleBottom.clientWidth/2 + "px";
}


//main function that stores the main functionality
function runGame(){

  function movepaddle() {
    if (isMovingLeft) {
      paddles.forEach(paddle =>{
        const currentLeft = parseInt(getComputedStyle(paddle).left);
      if (currentLeft > 0) {
        paddle.style.left = (currentLeft - 5) + 'px';
      }
      });
      requestAnimationFrame(movepaddle);
    }
    
    if (isMovingRight) {
      paddles.forEach(paddle =>{
        const currentLeft = parseInt(getComputedStyle(paddle).left);
        if (currentLeft < window.innerWidth - paddle.clientWidth) {
          paddle.style.left = (currentLeft + 5) + 'px';
        }
      });  
      requestAnimationFrame(movepaddle);
    }
  }

document.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    isMovingLeft = true;
    requestAnimationFrame(movepaddle);
  } else if (event.key === 'd') {
    isMovingRight = true;
    requestAnimationFrame(movepaddle);
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'a') {
    isMovingLeft = false;
  } else if (event.key === 'd') {
    isMovingRight = false;
  }
});



// ball functionality 
const ball = document.getElementById('ball');
let ballX = ballCurrentX;
let ballY = ballCurrentY;


function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    let topPaddle = paddleTop.getBoundingClientRect();
    let bottomPaddle = paddleBottom.getBoundingClientRect();

    if (ballX <= 13 || ballX >= window.innerWidth - 13){
        ballSpeedX = -ballSpeedX;
    }

    if(ballX - 12.5 <= topPaddle.right && ballX + 12.5 >= topPaddle.left){
      if(ballY - 12.5 <= topPaddle.bottom || ballY + 12.5 >= bottomPaddle.top){
        ballSpeedY = -ballSpeedY;
      }
    }else if(ballX - 12.5 >= topPaddle.right || ballX + 12.5 <= topPaddle.left){
      if(ballY - 12.5 <= 0){
        bringPaddlestoCenter();
        ballX = window.innerWidth/2;
        ballY = topPaddle.bottom + 13;
        ballSpeedY = -ballSpeedY;
        ballSpeedX = 0;
        ++bottomScore;
        if(bottomScore > localStorage.getItem("maxScore")){
          localStorage.setItem("maxScore",bottomScore);
          localStorage.setItem("name","BottomPaddle");
        }
        alert("bottom wins \nBOTTOM   " + bottomScore + " : " +topScore +"   TOP \nAnd highest score is: " + localStorage.getItem("maxScore"));
        isMovingLeft = false;
        isMovingRight = false;
        startGame = false;
      }else if(ballY + 12.5 >= window.innerHeight){
        bringPaddlestoCenter();
        ballX = window.innerWidth/2;
        ballY = bottomPaddle.top - 13;
        ballSpeedY = -ballSpeedY;
        ballSpeedX = 0;
        ++topScore;
        if(topScore > localStorage.getItem("maxScore")){
          localStorage.setItem("maxScore",topScore);
          localStorage.setItem("name","TopPaddle");
        }
        alert("top wins \nBOTTOM   " + bottomScore + " : " +topScore +"   TOP \nAnd highest score is: " + localStorage.getItem("maxScore"));
        isMovingLeft = false;
        isMovingRight = false;
        startGame = false;
      }
  }
    

    ball.style.left = ballX + 'px';
    ballCurrentX = ballX;
    ball.style.top = ballY + 'px';
    ballCurrentY = ballY;

    if(startGame){
      requestAnimationFrame(moveBall);
    }
    
}

 moveBall();
}


  






