// Game.js

// New class to associate words with the song titles and files
class GameItem {
    constructor(word, title, url) {
        this.word = word;
        this.title = title;
        this.url = url;
    }
}

// Pictures that will rotate while the page is loaded
var pictures = ["./assets/images/jimi-a.jpg",
    "./assets/images/jimi-b.jpg",
    "./assets/images/jimi-c.jpg",
    "./assets/images/jimi-d.jpg",
    "./assets/images/jimi-e.jpg",
    "./assets/images/jimi-f.jpg",
    "./assets/images/jimi-g.jpg",
    "./assets/images/jimi-h.jpg",
    "./assets/images/jimi-i.jpg",
    "./assets/images/jimi-j.jpg",];

// Building a Game object
var game = {
    maxGuess: 10,
    guessesLeft: 0,
    numberWins: 0,
    currentGamePiece: null,
    wordArray: [],
    board: [],
    missedLetters: [],
    hasGameStarted: false,
    isGameActive: false,

    // Creating an array of GameItems
    gamePieces: [new GameItem("machinegun", "Machine Gun", "./assets/src/machine-edit.mp3"),
    new GameItem("dagger", "Dolly Dagger", "./assets/src/dolly-edit.ogg"),
    new GameItem("experienced", "Are You Experienced?", "./assets/src/experienced-edit.ogg"),
    new GameItem("izabella", "Izabella", "./assets/src/izabella-edit.mp3"),
    new GameItem("littlewing", "Little Wing", "./assets/src/little-edit.mp3"),
    new GameItem("purplehaze", "Purple Haze", "./assets/src/purple-edit.ogg"),
    new GameItem("stonefree", "Stone Free", "./assets/src/stone-edit.mp3"),
    new GameItem("voodoochile", "Voodoo Chile", "./assets/src/voodoo-edit.mp3"),
    new GameItem("watchtower", "All Along the Watchtower", "./assets/src/watchtower-edit.mp3"),
    new GameItem("windcriesmary", "The Wind Cries Mary", "./assets/src/wind-edit.mp3")],

    // DOM calls
    temp: document.getElementById("data"),
    missedGuesses: document.getElementById("guesses"),
    guessCounter: document.getElementById("guessCount"),
    gameOver: document.getElementById("status"),
    totalWins: document.getElementById("wins"),
    clip: document.getElementById("myAudio"),

    // Methods
    startGame: function() {
        this.gameOver.textContent = "Press any key to begin!";
    },

    printBoard: function () {
        var tempString = "";
        for (let i = 0; i < this.board.length; ++i) {
            tempString += this.board[i];
        }
        return tempString;
    },

    updateGame: function () {
        this.temp.textContent = this.printBoard();
        this.missedGuesses.textContent = this.missedLetters;
        this.guessCounter.textContent = this.guessesLeft;
        this.totalWins.textContent = this.numberWins;
    },

    evaluateKey: function (key) {
        // Check to see if the key is in the wordArray
        if (this.wordArray.includes(key)) {
            for (var i = 0; i < this.currentGamePiece.word.length; ++i) {
                if (key === this.currentGamePiece.word[i]) {
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

    resetGame: function () {
        // Pick a gamePiece object
        this.currentGamePiece = this.gamePieces[Math.floor(Math.random() * this.gamePieces.length)]

        // Build the board and set up the word array
        this.board = [];
        this.wordArray = [];
        for (let i = 0; i < this.currentGamePiece.word.length; ++i) {
            this.wordArray.push(this.currentGamePiece.word[i]);
            this.board.push("_ ");
        }

        // Empty the missed array
        this.missedLetters = [];

        // Reset guessesLeft
        this.guessesLeft = this.maxGuess;

        this.isGameActive = true;

        this.updateGame();
    },

    isGameOver: function () {
        // Losing condition
        if (this.guessesLeft === 0) {
            this.isGameActive = false;
            this.gameOver.textContent = "You lose, try again";
            this.resetGame();
        } else if (this.board.includes("_ ") !== true) {
            this.isGameActive = false;
            this.numberWins++;
            this.gameOver.textContent = this.currentGamePiece.title;
            this.clip.setAttribute("src", this.currentGamePiece.url);
            this.clip.play();
            this.resetGame();
        }
    }

};


// Code for pulsing images
// Need to import jquery for this to work.

$(document).ready(function () {
    game.startGame();
    fadeIt();


    // Receive keyboard input to start the game.
    document.onkeyup = function (event) {
        // temp.textContent = event.key;
        if (game.hasGameStarted === false) {
            game.hasGameStarted = true;
            game.gameOver.textContent = "";
            game.resetGame();
        } else {
            if (game.isGameActive === true) {
                game.evaluateKey(event.key);
                game.isGameOver();
            }
        }
    }

});

function fadeIt() {
    // Set the picture first
    // $("#fadeImg").css("opacity", "0")
    $("#fadeImg").attr("src", pictures[Math.floor(Math.random() * pictures.length)]);
    $("#fadeImg").fadeOut(2000, function () {
        $(this).fadeIn(4000, fadeIt());
    })
}







// User inputs a key
// If key is a part of the word - update board with letter
// If the letter is not a part of the word, decrement guesses by one.
// Check for winning/losing conditions.  If the word is complete...show win
// If loss.. 