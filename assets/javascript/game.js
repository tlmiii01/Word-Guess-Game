// Game.js

// Pseudo code for game mechanics


var guessesLeft = 10;
var word = "testing";
var wordArray = [];
var board = [];
var missedLetters = [];

var temp = document.getElementById("data");
var missedGuesses = document.getElementById("guesses");

function printBoard() {
    var tempString = "";
    for (let i = 0; i < board.length; ++i) {
        tempString += board[i];
    }
    return tempString;
    console.log(tempString);
}

function updateGame() {
    temp.textContent = printBoard();
    missedGuesses.textContent = missedLetters;
    console.log(board);
}

function evaluateKey(key) {
    missedLetters += event.key + " ";

    for (var i = 0; i < word.length; ++i) {
        if (key === word[i]) {
            console.log("In if statement");
            // Need to figure out how to update the string.
            board[i] = key + " ";
        }
    }
    updateGame();
}


for (let i = 0; i < word.length; ++i) {
    wordArray.push(word[i]);
    board.push("_ ");
}

updateGame();

// Receive keyboard input to start the game.
document.onkeyup = function (event) {
    // temp.textContent = event.key;
    evaluateKey(event.key)
}








// User inputs a key
// If key is a part of the word - update board with letter
// If the letter is not a part of the word, decrement guesses by one.
// Check for winning/losing conditions.  If the word is complete...show win
// If loss.. 