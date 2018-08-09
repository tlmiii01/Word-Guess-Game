// Game.js

// Pseudo code for game mechanics


var guessesLeft = 10;
var word = "testing";
var wordArray = [];
var board = [];
var missedLetters = [];
var hasGameStarted = false;
var isGameActive = false;

var temp = document.getElementById("data");
var missedGuesses = document.getElementById("guesses");
var guessCounter = document.getElementById("guessCount");
var gameOver = document.getElementById("gameStatus")

function printBoard() {
    var tempString = "";
    for (let i = 0; i < board.length; ++i) {
        tempString += board[i];
    }
    return tempString;
    // console.log(tempString);
}

function updateGame() {
    temp.textContent = printBoard();
    missedGuesses.textContent = missedLetters;
    guessCounter.textContent = guessesLeft;
    console.log(board);
}

function evaluateKey(key) {
    // Check to see if the key is in the wordArray
    console.log(wordArray.includes(key));

    if (wordArray.includes(key)) {
        for (var i = 0; i < word.length; ++i) {
            if (key === word[i]) {
                console.log("In if statement");
                // Need to figure out how to update the string.
                board[i] = key + " ";
            }
        }
    } else if (missedLetters.includes(key + " ")) {
        console.log("Already guessed");
    } else {
        missedLetters += key + " ";
        guessesLeft--;
    }
    updateGame();
}

for (let i = 0; i < word.length; ++i) {
    wordArray.push(word[i]);
    board.push("_ ");
}

updateGame();

function isGameOver() {
    if (guessesLeft === 0) {
        isGameActive = false;
        gameOver.textContent = "You lose...";
    } else if (board.includes("_ ") !== true) {
        isGameActive = false;
        gameOver.textContent = "We have a winner!!";
    }
    updateGame();
}

// Receive keyboard input to start the game.
document.onkeyup = function (event) {
    // temp.textContent = event.key;
    if (hasGameStarted === false) {
        hasGameStarted = true;
        isGameActive = true;
    } else {
        if (isGameActive === true) {
            evaluateKey(event.key)
            isGameOver();
        }
    }
}









// User inputs a key
// If key is a part of the word - update board with letter
// If the letter is not a part of the word, decrement guesses by one.
// Check for winning/losing conditions.  If the word is complete...show win
// If loss.. 