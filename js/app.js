

/*-------------------------------- Constants --------------------------------*/
const BOARD_SIZE = 15
const DIRECTIONS = {
  ArrowUp: { x:0, y: -1 },
  ArrowDown: { x:0, y: 1 },
  ArrowLeft: { x:-1, y: 0 },
  ArrowRight: { x:1, y: 0 },
}
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
const fruitCountDisplay = document.getElementById
const resetButton = document.getElementById
/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Functions --------------------------------*/
function init() {
  board.innerHTML = '';
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
}
//TODO function to make the creation of the board. snake and food.
//TODO function to move food.
//TODO unshift method to grow the snake.
//TODO Deny the snake of moving backwards.
//todo reset function to reset everything back to base functionality of the game.
//the init function should create the board.
init()