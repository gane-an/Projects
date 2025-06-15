const board = document.querySelector("#board");
const squares = document.querySelectorAll(".square");
let currentPlayer = Math.random() > 0.5 ? "X" : "O";
let gameOver = false;
let isAutoPlaying = false;
let statusShow = document.querySelector(".status");
const winningPossibilities = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
if (currentPlayer === "X") {
  autoPlayer(currentPlayer);
  currentPlayer = "O";
} else {
  statusShow.textContent = "Your Turn!";
}

squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (square.textContent !== "" || gameOver || isAutoPlaying) return;
    markSymbol(square, currentPlayer);
    checkWinner(currentPlayer);
    if (gameOver) return;
    currentPlayer = currentPlayer === "O" ? "X" : "O";
    if (currentPlayer === "X") {
      autoPlayer(currentPlayer);
      currentPlayer = "O";
    }
  });
});
function checkWinner(currentPlayer) {
  for (let combo of winningPossibilities) {
    if (
      squares[combo[0]].textContent === currentPlayer &&
      squares[combo[1]].textContent === currentPlayer &&
      squares[combo[2]].textContent === currentPlayer
    ) {
      document.querySelector(".info").textContent =
        (currentPlayer === "X" ? "Computer" : "You") + " Won! 😎";
      modifyInfo();
      return;
    }
  }
  const allFilled = [...squares].every((sq) => sq.textContent !== "");
  if (allFilled) {
    document.querySelector(".info").textContent = "Draw!";
    modifyInfo();
  }
}

function modifyInfo() {
  // document.querySelector(".info").style.transition = "0.3s";
  // document.querySelector(".info").style.transform = "translateX(0%)";
  // document.querySelector(".info").style.opacity = "1";
  document.querySelector(".info").classList.add("active");
  gameOver = true;
}
function markSymbol(square, player) {
  if (square.textContent !== "") return;

  const h1 = document.createElement("h1");
  h1.textContent = player;
  square.appendChild(h1);
}

function autoPlayer(player) {
  if (player !== "X") return;
  isAutoPlaying = true;
  statusShow.textContent = "Computer's Turn!";

  const emptySquares = [...squares].filter((sq) => sq.textContent === "");
  if (emptySquares.length === 0) {
    isAutoPlaying = false;
    return;
  }
  const randomSquare =
    emptySquares[Math.floor(Math.random() * emptySquares.length)];
  board.style.pointerEvents = "none";
  setTimeout(() => {
    markSymbol(randomSquare, player);
    checkWinner(player);
    isAutoPlaying = false;
    board.style.pointerEvents = "auto";
    if (!gameOver) {
      currentPlayer = "O";
      statusShow.textContent = "Your Turn!";
    }
  }, 1000);
}

//Resetting the game
document.querySelector(".rst-btn").addEventListener("click", resetGame);

function resetGame() {
  squares.forEach((sq) => {
    sq.innerHTML = "";
  });
  gameOver = false;
  isAutoPlaying = false;
  document.querySelector(".info").classList.remove("active");
  document.querySelector(".info").textContent = "";

  currentPlayer = Math.random() > 0.5 ? "X" : "O";

  if (currentPlayer === "X") {
    autoPlayer(currentPlayer);
    currentPlayer = "O";
  }
}
