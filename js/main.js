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

/*------Cached Element References------*/

const board = document.querySelector('section.board');
const squares = board.children;
const message = document.getElementById('message');
const replay = document.getElementById('replayButton');


/*------Event Listeners------*/

board.onclick = function (e) {
    let squareNum = e.target.id[2];
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
            squares[s].innerHTML = '<span class="ecks">X</span>';
        }
        else if (boardState[s] === -1) {
            squares[s].innerHTML = '<span class="oh">O</span>';
        }
        else if (boardState[s] === null) {
            squares[s].innerHTML = ''
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
