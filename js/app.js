//function to make the creation of the board. snake and food.
//function to move food.
//unshift method to grow the snake.
//Deny the snake of moving backwards.
//reset function to reset everything back to base functionality of the game.

/*-------------------------------- Constants --------------------------------*/
const
const
/*-------------------------------- Variables --------------------------------*/
let snake = [{ x:0, y:0 }]
let direction = Directions.ArrowRight;
let fruit = { x:0 , y:0 }
let gameInterval;
let fruitCount = 0;
let gameOver = false;
/*------------------------ Cached Element References ------------------------*/
const board = document.getElementById
const message = document.getElementById
const fruitCount = document.getElementById
const resetButton = document.getElementById
/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/
function init() {

}