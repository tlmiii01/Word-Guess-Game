// Game.js

// Pseudo code for game mechanics

// Building a Game objec
var game = {
    maxGuess: 10,
    guessesLeft: 0,
    numberWins: 0,
    word: "",
    wordArray: [],
    board: [],
    missedLetters: [],
    hasGameStarted: false,
    isGameActive: false,
    words: ["machinegun", "voodoochile", "changes", "spangled", "izabella", "purplehaze", "heyjoe"],

    // DOM calls
    temp: document.getElementById("data"),
    missedGuesses: document.getElementById("guesses"),
    guessCounter: document.getElementById("guessCount"),
    gameOver: document.getElementById("gameStatus"),
    totalWins: document.getElementById("wins"),

    // Methods
    printBoard: function() {
        var tempString = "";
        for (let i = 0; i < this.board.length; ++i) {
            tempString += this.board[i];
        }
        return tempString;
    },

    updateGame: function() {
        this.temp.textContent = this.printBoard();
        this.missedGuesses.textContent = this.missedLetters;
        this.guessCounter.textContent = this.guessesLeft;
        this.totalWins.textContent = this.numberWins;
    },

    evaluateKey: function(key) {
        // Check to see if the key is in the wordArray
        if (this.wordArray.includes(key)) {
            for (var i = 0; i < this.word.length; ++i) {
                if (key === this.word[i]) {
                    // Need to figure out how to update the string.
                    this.board[i] = key + " ";
                }
            }
        } else if (this.missedLetters.includes(key + " ")) {
            // Do nothing...
        } else {
            this.missedLetters += key + " ";
            this.guessesLeft--;
        }
        this.updateGame();
    },

    resetGame: function() {
        // Set word to a value - for now seeding, but will be a random word later
        this.word = this.words[Math.floor(Math.random() * this.words.length)]
        
        // Build the board and set up the word array
        this.board = [];
        this.wordArray = [];
        for (let i = 0; i < this.word.length; ++i) {
            this.wordArray.push(this.word[i]);
            this.board.push("_ ");
        }
    
        // Empty the missed array
        this.missedLetters = [];
    
        // Reset guessesLeft
        this.guessesLeft = this.maxGuess;
    
        this.isGameActive = true;
    
        this.gameOver = "";
        this.updateGame();
    },

    isGameOver: function() {
        if (this.guessesLeft === 0) {
            this.isGameActive = false;
            this.gameOver.textContent = "You lose...";
            this.resetGame();
        } else if (this.board.includes("_ ") !== true) {
            this.isGameActive = false;
            this.numberWins++;
            this.gameOver.textContent = "We have a winner!!";
            this.resetGame();
        }
    }

};


// var maxGuess = 10;
// var guessesLeft = 0;
// var word = "";
// var wordArray = [];
// var board = [];
// var missedLetters = [];
// var hasGameStarted = false;
// var isGameActive = false;
// var numberWins = 0;
// var words = ["machinegun", "voodoochile", "changes", "spangled", "izabella", "purplehaze", "heyjoe"];

// var temp = document.getElementById("data");
// var missedGuesses = document.getElementById("guesses");
// var guessCounter = document.getElementById("guessCount");
// var gameOver = document.getElementById("gameStatus");
// var totalWins = document.getElementById("wins");

// function printBoard() {
//     var tempString = "";
//     for (let i = 0; i < board.length; ++i) {
//         tempString += board[i];
//     }
//     return tempString;
//     // console.log(tempString);
// }

// function updateGame() {
//     temp.textContent = printBoard();
//     missedGuesses.textContent = missedLetters;
//     guessCounter.textContent = guessesLeft;
//     totalWins.textContent = numberWins;
//     console.log(board);
// }

// function evaluateKey(key) {
//     // Check to see if the key is in the wordArray
//     console.log(wordArray.includes(key));

//     if (wordArray.includes(key)) {
//         for (var i = 0; i < word.length; ++i) {
//             if (key === word[i]) {
//                 console.log("In if statement");
//                 // Need to figure out how to update the string.
//                 board[i] = key + " ";
//             }
//         }
//     } else if (missedLetters.includes(key + " ")) {
//         console.log("Already guessed");
//     } else {
//         missedLetters += key + " ";
//         guessesLeft--;
//     }
//     updateGame();
// }



// function resetGame() {
//     // Set word to a value - for now seeding, but will be a random word later
//     word = words[Math.floor(Math.random() * words.length)]
    
//     // Build the board and set up the word array
//     board = [];
//     wordArray = [];
//     for (let i = 0; i < word.length; ++i) {
//         wordArray.push(word[i]);
//         board.push("_ ");
//     }

//     // Empty the missed array
//     missedLetters = [];

//     // Reset guessesLeft
//     guessesLeft = maxGuess;

//     isGameActive = true;

//     gameOver = "";
//     updateGame();
// }


// function isGameOver() {
//     if (guessesLeft === 0) {
//         isGameActive = false;
//         gameOver.textContent = "You lose...";
//         resetGame();
//     } else if (board.includes("_ ") !== true) {
//         isGameActive = false;
//         numberWins++;
//         gameOver.textContent = "We have a winner!!";
//         resetGame();
//     }
// }

// Receive keyboard input to start the game.
document.onkeyup = function (event) {
    // temp.textContent = event.key;
    if (game.hasGameStarted === false) {
        game.hasGameStarted = true;
        game.resetGame();
    } else {
        if (game.isGameActive === true) {
            game.evaluateKey(event.key);
            game.isGameOver();
        }
    }
}









// User inputs a key
// If key is a part of the word - update board with letter
// If the letter is not a part of the word, decrement guesses by one.
// Check for winning/losing conditions.  If the word is complete...show win
// If loss.. 