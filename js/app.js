/*-------------------------------- Constants --------------------------------*/
const BOARD_SIZE = 15;
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};
/*-------------------------------- Variables --------------------------------*/
let snake = [{ x: 7, y: 12 }];
let direction = "ArrowUp";
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
function init() {
  board.innerHTML = "";
  for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
  }
  updateBoard();
  placeFruit();
}
function updateBoard() {
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell) =>
    cell.classList.remove(
      "snake-head",
      "snake",
      "snake-tail",
      "fruit",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight"
    )
  );
  snake.forEach((segment, index) => {
    let cellIndex = segment.y * BOARD_SIZE + segment.x;
    cells[cellIndex].classList.add("snake");
    if (index === 0) {
      cells[cellIndex].classList.add("snake-head", direction);
    } else if (index === snake.length - 1) { 
      cells[cellIndex].classList.add("snake-tail");
    }
  });
  let fruitIndex = fruit.y * BOARD_SIZE + fruit.x;
  cells[fruitIndex].classList.add("fruit");
}
function placeFruit() {
  fruit = {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE),
  };
  if (snake.some((segment) => segment.x === fruit.x && segment.y === fruit.y)) {
    placeFruit();
  }
}
function moveSnake() {
  let head = {
    x: snake[0].x + DIRECTIONS[direction].x,
    y: snake[0].y + DIRECTIONS[direction].y,
  };
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
  snake.unshift(head);
  if (head.x === fruit.x && head.y === fruit.y) {
    fruitCount++;
    fruitCountDisplay.textContent = `Fruit Eaten: ${fruitCount}`;
    message.textContent = "Im a sneeeeek";
    if (snake.length === BOARD_SIZE * BOARD_SIZE) {
      gameOver = true;
      clearInterval(gameInterval);
      message.textContent = "You Win! Cobra Kai!";
      return;
    }
    placeFruit();
  } else {
    snake.pop();
  }
  updateBoard();
  directionChanged = false;
}
function handleKeydown(event) {
  if (!gameStarted && DIRECTIONS[event.key]) {
    gameStarted = true;
    gameInterval = setInterval(moveSnake, 100);
  }
  if (DIRECTIONS[event.key] && !directionChanged && !gameOver) {
    let newDirection = DIRECTIONS[event.key];
    let currentDirection = DIRECTIONS[direction];
    if (
      newDirection.x !== -currentDirection.x &&
      newDirection.y !== -currentDirection.y
    ) {
      direction = event.key; 
      directionChanged = true;
    }
  }
}
function resetGame() {
  clearInterval(gameInterval);
  snake = [{ x: 7, y: 12 }];
  direction = "ArrowUp";
  fruit = { x: 7, y: 7 };
  fruitCount = 0;
  fruitCountDisplay.textContent = `I'm just a baby`;
  gameOver = false;
  gameStarted = false;
  directionChanged = false;
  message.textContent = "Get Ready!";
  init();
  updateBoard();
}
function toggleHelp() {
  if (helpMessage.style.display === "none") {
    helpMessage.style.display = "block";
  } else {
    helpMessage.style.display = "none";
  }
}

init();
