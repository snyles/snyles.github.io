/*------Constants------*/

const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const colors = {
    null: "#ccc",
    player1: "orange",
    player2: "green"
}

/*------Variables (state)------*/

let playerTurn;
let winner;
let boardState = [];


// Variables might include (board/turn/winner)

/*------Cached Element References------*/

const board = document.querySelector('section.board');
const squares = board.children;
const message = document.getElementById('message');
const replay = document.getElementById('replayButton');

// You might choose to put your game status here

/*------Event Listeners------*/

board.onclick = function (e) {
    square = e.target;
    squareNum = square.id[2];
    if (!winner && boardState[squareNum] === null) {
        boardState[squareNum] = playerTurn;
        checkForWin();
        playerTurn *= -1;
        render();
    }
}

replay.onclick = function() {
    reset();
    render();
}
// This is where you should put the event listener
// for a mouse-click

/*------Functions------*/

function init() {
    for(let i = 0; i < 9; i++) {
        boardState[i] = null;
    }
    playerTurn = 1;
    winner = null;
    render();
}

function reset() {
    for(let i = 0; i < 9; i++) {
        boardState[i] = null;
    }
    playerTurn = 1;
    winner = null;
}

function render() {
    for (let s in boardState) {
        if (boardState[s] === 1) {
            squares[s].innerText = "X";
        }
        else if (boardState[s] === -1) {
            squares[s].innerText = "O";
        }
        else if (boardState[s] === null) {
            squares[s].innerText = "";
        }
    }
    if (!winner) {
        if (playerTurn === 1) {
            message.innerText = "Player X's Turn";
        } else {
            message.innerText = "Player O's Turn";
        }
    } else if (winner === "T") {
        message.innerText = "It's a Draw!";
    } else {
        if (winner === 1) {
            message.innerText = "Player X Wins!";
        } else if (winner === -1) {
            message.innerText = "Player O Wins!"
        }
    }
}

function checkForWin() {
    for (let triplet of winCondition) {
        // if (triplet.every( n => boardState[n] === 1 )) {
        //     winner = 1;
        // }
        // else if (triplet.every( n => boardState[n] === -1)) {
        //     winner = -1;
        // }

        let sum = 0;
        for (let i of triplet) {
            sum += boardState[i];
        }
        console.log(sum);
        if (Math.abs(sum) === 3) {
            winner = boardState[triplet[0]];
            return;
        }
    }
    if (!boardState.includes(null)) {
        winner = "T";
    }
}



init();
// Some functions you might choose to use:

// Initialization function:
// Where you set your initial state, setting up 
// what the board will look like upon loading

// On-Click function:
// Set up what happens when one of the elements
// is clicked


// Check winner function:
// Checks the current state of the board for
// a winner and changes the state of the winner
// variable if so


// Render function:
// Displays the current state of the board
// on the page, updating the elements to reflect
// either X or O depending on whose turn it is
