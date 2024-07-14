

/*-------------------------------- Constants --------------------------------*/
const BOARD_SIZE = 15
const DIRECTIONS = {
  ArrowUp: { x:0, y: 1 },
  ArrowDown: { x:0, y: -1 },
  ArrowLeft: { x:-1, y: 0 },
  ArrowRight: { x:1, y: 0 },
}
/*-------------------------------- Variables --------------------------------*/
let snake = [{ x:10, y:10 }]
let direction = DIRECTIONS;
let fruit = { x:7 , y:7 }
// let gameInterval = setInterval(moveSnake, 100);
let fruitCount = 0;
let gameOver = false;
/*------------------------ Cached Element References ------------------------*/
const board = document.getElementById('board')
const message = document.getElementById('message')
const fruitCountDisplay = document.getElementById('fruit-count')
const resetButton = document.getElementById('reset-button')

/*----------------------------- Event Listeners -----------------------------*/
//document.addEventListener('keydown', handleKeydown);
//resetButton.addEventListener('click', resetGame);
/*-------------------------------- Functions --------------------------------*/
//the init function should create the board.
function init() {
  board.innerHTML = '';
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
  updateBoard();
  placeFruit();
}
function updateBoard() {
  let cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.classList.remove('snake', 'fruit'));
  snake.forEach(segment => {
    let index = segment.y * BOARD_SIZE + segment.x ;
    cells[index].classList.add('snake');
  });
  let fruitIndex = fruit.y * BOARD_SIZE + fruit.x;
  cells[fruitIndex].classList.add('fruit');
}
function placeFruit() {
  fruit = {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE),
  };
  //its makes it so it replaces fruit if it lands on the snake...
  if (snake.some(segment => segment.x === fruit.x && segment.y === fruit.y)) {
    placeFruit();
  }
}



//TODO function to make the creation of the board. snake and food.
//TODO function to move food.
//TODO unshift method to grow the snake.
//TODO Deny the snake of moving backwards.
//todo reset function to reset everything back to base functionality of the game.
//the init function should create the board.
init();
