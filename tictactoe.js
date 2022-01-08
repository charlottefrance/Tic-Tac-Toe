const statusUpdate = document.querySelector('status')

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", ""];

const winner = () => `Player ${currentPlayer}! You've won!`;
const draw = () => `Its a draw!`;
const currentPlayerTurn = () => `It's your turn ${currentPlayer}!`

statusUpdate.innerHTML = currentPlayerTurn();

function handleSquarePlayed(clickedSquare, clickedSquareIndex) {
    gameState[clickedSquareIndex] = currentPlayer;
    clickedSquare.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleSquareClick(clickedSquareEvent) {
    const clickedSquare = clickedSquareEvent.target;
    const clickedSquareIndex = parseInt(
        clickedSquare.getAttribute('grid-number')
    );
    if (gameState[clickedSquareIndex] !== "" || !gameActive) {
        return;
    }
    handleSquarePlayed(clickedSquare, clickedSquareIndex);
    handleResultValidation();
}


document.querySelectorAll('.grid').forEach(grid => grid.addEventListener('click', handleSquarePlayed));
document.querySelector('.restart').addEventListener('click', handleRestartGame);