

/*-------------------------------- Constants --------------------------------*/
const BOARD_SIZE = 15
const DIRECTIONS = {
  ArrowUp: { x:0, y: -1 },
  ArrowDown: { x:0, y: 1 },
  ArrowLeft: { x:-1, y: 0 },
  ArrowRight: { x:1, y: 0 },
}
/*-------------------------------- Variables --------------------------------*/
let snake = [{ x:10, y:10 }]
let direction = DIRECTIONS.ArrowUp;
let fruit = { x:7 , y:7 }
let fruitCount = 0;
let gameOver = false;
let gameStarted = false;
/*------------------------ Cached Element References ------------------------*/
const board = document.getElementById('board')
const message = document.getElementById('message')
const fruitCountDisplay = document.getElementById('fruit-count')
const resetButton = document.getElementById('reset-button')

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('keydown', handleKeydown);
resetButton.addEventListener('click', resetGame);
/*-------------------------------- Functions --------------------------------*/
//the init function should create the board.
function init() {
//function to make the creation of the board. 
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
//snake and food creation
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
//function to move food.
  fruit = {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE),
  };
  //its makes it so it replaces fruit if it lands on the snake...
  if (snake.some(segment => segment.x === fruit.x && segment.y === fruit.y)) {
    placeFruit();
  }
}

function handleKeydown(event) {
  if (DIRECTIONS[event.key]) {
    direction = DIRECTIONS[event.key]
  }
}
//this code allows for change of direction
function moveSnake() {
  let head = { x:snake[0].x + direction.x, y: snake[0].y + direction.y };
  if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    gameOver = true;
    clearInterval(gameInterval);
    message.textContent = 'Game Over!';
    return
  }
  snake.unshift(head);
  if (head.x === fruit.x && head.y === fruit.y) {
    fruitCount++;
    fruitCountDisplay.textContent = `Fruit Eaten: ${fruitCount}`;
    placeFruit();
  } else {
    snake.pop();
  }
  updateBoard();
}

function resetGame() {
snake = [{ x:10, y:10 }]
direction = DIRECTIONS.ArrowUp;
fruit = { x:7 , y:7 }
gameInterval = setInterval(moveSnake, 100);
fruitCount = 0;
gameOver = false;
message.textContent = 'Git Ready!';
clearInterval(gameInterval);
init();
}


//TODO unshift method to grow the snake.
//TODO Deny the snake of moving backwards.
//todo reset function to reset everything back to base functionality of the game.
//the init function should create the board.
init();
gameInterval = setInterval(moveSnake, 150);
