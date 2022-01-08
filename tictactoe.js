const statusDisplay = document.querySelector('.status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", ""];


const winningMessage = () => `Player ${currentPlayer}! You've won!`;
const drawMessage =() => `Its a draw!`;
const currentPlayerTurn = () => `It's your turn ${currentPlayer}!`

statusDisplay.innerHTML = currentPlayerTurn();

const winningPossibility = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleSquarePlayed(clickedSquare, clickedSquareIndex) {
    gameState[clickedSquareIndex] = currentPlayer;
    clickedSquare.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winPoss = winningPossibility[i];
        let a = gameState[winPoss[0]];
        let b = gameState[winPoss[1]];
        let c = gameState[winPoss[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleSquareClick(clickedSquareEvent) {
    const clickedSquare = clickedSquareEvent.target;
    const clickedSquareIndex = parseInt(
        clickedSquare.getAttribute('data-cell-index'));

    if (gameState[clickedSquareIndex] !== "" || !gameActive) {
        return;
    }
    handleSquarePlayed(clickedSquare, clickedSquareIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.grid').forEach(grid => grid.innerHTML = "");
}

document.querySelectorAll('.grid').forEach(grid => grid.addEventListener('click', handleSquareClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);

