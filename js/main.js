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

/*------Variables (state)------*/

let playerTurn;
let wentFirst;
let winner;
let boardState = [];
let winTriplet;

/*------Cached Element References------*/

const board = document.querySelector('section.board');
const squares = board.children;
const message = document.getElementById('message');
const replay = document.getElementById('replayButton');
const title = document.querySelector('h1');
const titleSpans = title.children;

/*------Event Listeners------*/

board.addEventListener('click', function (e) {
    let squareNum = parseInt(e.target.id[2]);
    if (!winner && boardState[squareNum] === null) {
        boardState[squareNum] = playerTurn;
        winTriplet = checkForWin();
        playerTurn *= -1;
        render();
    }
});

replay.addEventListener('click', reset);

/*------Functions------*/

function init() {
    animateTitle();
    for(let i = 0; i < 9; i++) {
        boardState[i] = null;
    }
    playerTurn = 1;
    wentFirst = 1;
    winner = null;
    render();
}

function reset() {
    fadeOutSquares();
    if (winTriplet) {
        for (let y of winTriplet) {
            squares[y].classList.remove('highlight');
        }
    winTriplet = null;
    }
    for(let i = 0; i < 9; i++) {
        boardState[i] = null;
    }
    wentFirst *= -1;
    playerTurn = wentFirst;
    winner = null;
    render();
}

function render() {
    //draw board
    for (let s in boardState) {
        if (boardState[s] === 1 && !squares[s].innerHTML) {
            squares[s].innerHTML = '<span class="ecks animate__animated animate__fadeIn">X</span>';
        }
        else if (boardState[s] === -1 && !squares[s].innerHTML) {
            squares[s].innerHTML = '<span class="oh animate__animated animate__fadeIn">O</span>';
        }
    }
   
    //change message
    if (!winner) {
        if (playerTurn === 1) {
            message.innerText = "Player X's Turn";
        } else {
            message.innerText = "Player O's Turn";
        }
        animateMessage('pulse', 1000);
    } else if (winner === "T") {
        message.innerText = "It's a Draw!";
        animateMessage('swing', 1000);
    } else {
        if (winner === 1) {
            message.innerText = "Player X Wins!";
        } else if (winner === -1) {
            message.innerText = "Player O Wins!"
        }
        animateMessage('tada', 1000);
    }
    if(winTriplet) {
        for (let i of winTriplet) {
            squares[i].classList.add('highlight');
        }
    }
}

function checkForWin() {
    for (let triplet of winCondition) {
        let sum = 0;
        for (let i of triplet) {
            sum += boardState[i];
        }
        if (Math.abs(sum) === 3) {
            winner = boardState[triplet[0]];
            return triplet;
        }
    }
    if (!boardState.includes(null)) {
        winner = "T";
    }
    return null;
}

function animateTitle() {
    for (let i in titleSpans) {
        setTimeout( function () {
            titleSpans[i].className = "animate__animated animate__slideInDown";
        }, 400 * i)
    }
}

function animateMessage(anim, t) {
    message.classList.add(`animate__${anim}`);
    setTimeout(function() {
        message.classList.remove(`animate__${anim}`);
    }, (t || 500));
}

function fadeOutSquares() {
    let ecks = document.querySelectorAll('.ecks');
    let ohs = document.querySelectorAll('.oh');
    for (let x of ecks) {
        x.className = "ecks animate__animated animate__fadeOut";
        setTimeout(function() {
            x.parentElement.innerHTML = '';
        }, 1000);
    }
    for (let o of ohs) {
        o.className = "oh animate__animated animate__fadeOut";
        setTimeout(function() {
            o.parentElement.innerHTML = '';
        }, 1000);
    }
}

init();
