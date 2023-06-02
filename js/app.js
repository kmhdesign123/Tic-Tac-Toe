"use strict";
/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
let player;
/*------------------------ Cached Element References ------------------------*/
const squareEls = Array.from(document.querySelectorAll('.sqr'));
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((sqr, index) => {
    sqr.addEventListener('click', () => handleClick(index));
});
if (resetBtnEl) {
    resetBtnEl.addEventListener('click', init);
}
/*-------------------------------- Functions --------------------------------*/
function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = false;
    tie = false;
    playerName();
    render();
}
init();
function render() {
    updateBoard();
    updateMessage();
}
function updateBoard() {
    squareEls.forEach((el, index) => {
        if (board[index] === null) {
            el.textContent = '';
        }
        else if (board[index] === 1) {
            el.textContent = 'X';
        }
        else {
            el.textContent = 'O';
        }
    });
}
function updateMessage() {
    if (messageEl) {
        if (!winner && !tie) {
            messageEl.textContent = `It's ${player}'s turn!`;
        }
        else if (!winner && tie) {
            messageEl.textContent = `It's a Tie!`;
        }
        else {
            messageEl.textContent = `Congrats, ${player}, You Win!`;
        }
    }
}
function handleClick(index) {
    if (board[index] || winner)
        return;
    placePiece(index);
    checkForTie();
    checkForWinner();
    switchPlayerTurn();
    playerName();
    render();
}
function placePiece(index) {
    board[index] = turn;
}
function checkForTie() {
    if (!board.includes(null)) {
        tie = true;
    }
}
function checkForWinner() {
    winningCombos.forEach((combo) => {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = true;
        }
    });
}
function switchPlayerTurn() {
    if (!winner)
        turn *= -1;
}
function playerName() {
    if (turn === 1) {
        player = 'Player 1';
    }
    else if (turn === -1) {
        player = 'Player 2';
    }
}
