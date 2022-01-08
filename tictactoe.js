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

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gamestate[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
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
        return
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}


document.querySelectorAll('.grid').forEach(grid => grid.addEventListener('click', handleSquarePlayed));
document.querySelector('.restart').addEventListener('click', handleRestartGame);