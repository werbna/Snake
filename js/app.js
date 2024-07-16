/*-------------------------------- Constants --------------------------------*/
const BOARD_SIZE = 15;
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 , },
  ArrowDown: { x: 0, y: 1, },
  ArrowLeft: { x: -1, y: 0, },
  ArrowRight: { x: 1, y: 0, },
};
/*-------------------------------- Variables --------------------------------*/
let snake = [{ x: 7, y: 12 }];
let direction = 'ArrowUp';
let fruit = { x: 7, y: 7 };
let fruitCount = 0;
let gameOver = false;
let gameStarted = false;
let gameInterval = null;
let directionChanged = false;
/*------------------------ Cached Element References ------------------------*/
const board = document.getElementById("board");
const message = document.getElementById("message");
const fruitCountDisplay = document.getElementById("fruit-count");
const resetButton = document.getElementById("reset-button");
const helpButton = document.getElementById("help-button");
const helpMessage = document.getElementById("help-message");
/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener("keydown", handleKeydown);
resetButton.addEventListener("click", resetGame);
helpButton.addEventListener("click", toggleHelp);
/*-------------------------------- Functions --------------------------------*/
//the init function should create the board.
function init() {
  //function to make the creation of the board.
  board.innerHTML = "";
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
//this line makes it so they are gridded together vs being put into one little cube over and over again.
    let cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
  }
  updateBoard();
  placeFruit();
}
function updateBoard() {
  // snake and food creation
  let cells = document.querySelectorAll(".cell");
  // remove classes from all cells
  cells.forEach((cell) => cell.classList.remove('snake-head', 'snake', 'fruit', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'));
  
   // add classes to snake segments
  snake.forEach((segment, index) => {
    let cellIndex = segment.y * BOARD_SIZE + segment.x;
      cells[cellIndex].classList.add("snake");
    if (index === 0) {
      cells[cellIndex].classList.add('snake-head', direction);
    }
  });


  // add class to fruit
  let fruitIndex = fruit.y * BOARD_SIZE + fruit.x;
  cells[fruitIndex].classList.add("fruit");
}
function placeFruit() {
  //function to move food.
  fruit = {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE),
  };
  //its makes it so it replaces fruit if it lands on the snake...
  if (snake.some((segment) => segment.x === fruit.x && segment.y === fruit.y)) {
    placeFruit();
  }
}

//implements game start upon keypress.
function handleKeydown(event) {
  if (!gameStarted && DIRECTIONS[event.key]) {
    gameStarted = true;
    gameInterval = setInterval(moveSnake, 100);
  }
//deny the snake of moving backwards.
  if (DIRECTIONS[event.key] && !directionChanged && !gameOver) {
    let newDirection = DIRECTIONS[event.key];
    let currentDirection = DIRECTIONS[direction];
    if (newDirection.x !== -currentDirection.x && newDirection.y !== -currentDirection.y) {
      direction = event.key; // update direction to the key pressed
      directionChanged = true;
    }
  }
}
//deny the snake of moving backwards, this code allows for 1 change of direction per square
function moveSnake() {
  let head = { x: snake[0].x + DIRECTIONS[direction].x, y: snake[0].y + DIRECTIONS[direction].y };
  if (
    head.x < 0 ||
    head.x >= BOARD_SIZE ||
    head.y < 0 ||
    head.y >= BOARD_SIZE ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    gameOver = true;
    clearInterval(gameInterval);
    message.textContent = "Git Good!";
    return;
  }
  //unshift method to grow the snake.
  snake.unshift(head);
  if (head.x === fruit.x && head.y === fruit.y) {
    fruitCount++;
    fruitCountDisplay.textContent = `Fruit Eaten: ${fruitCount}`;
    message.textContent = "Im a sneeeeek";
    if (snake.length === BOARD_SIZE * BOARD_SIZE) {
      gameOver = true;
      clearInterval(gameInterval);
      message.textContent = 'You Win! Cobra Kai!'
      return
    }
    placeFruit();
  } else {
    snake.pop();
  }
  updateBoard();
  directionChanged = false;
}
//reset function to reset everything back to base functionality of the game.
function resetGame() {
  clearInterval(gameInterval);
  snake = [{ x: 7, y: 12 }];
  direction = 'ArrowUp'; // Reset direction
  fruit = { x: 7, y: 7 };
  fruitCount = 0;
  fruitCountDisplay.textContent = `I'm just a baby`;
  gameOver = false; 
  gameStarted = false; //reset game status
  directionChanged = false; //resets direction
  message.textContent = "Get Ready!";
  init();
  updateBoard();
}
//this toggles the help button
function toggleHelp() {
  if (helpMessage.style.display === "none") {
    helpMessage.style.display = "block";
  } else {
    helpMessage.style.display = "none";
  }
}

init();

