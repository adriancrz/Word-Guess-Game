//Array of Pokémon.

var pokemonArray = [
    {
        word: "charizard",
        image1: "assets/images/006charizard-b.png",
        image2: "assets/images/006charizard.png"
    },
    {
        word: "pikachu",
        image1: "assets/images/025pikachu-b.png",
        image2: "assets/images/025pikachu.png"
    },
    {
        word: "magnemite",
        image1: "assets/images/081magnemite-b.png",
        image2: "assets/images/081magnemite.png"
    },
    {
        word: "eevee",
        image1: "assets/images/133eevee-b.png",
        image2: "assets/images/133eevee.png"
    },
    {
        word: "mewtwo",
        image1: "assets/images/150mewtwo-b.png",
        image2: "assets/images/150mewtwo.png"
    },
    {
        word: "mew",
        image1: "assets/images/151mew-b.png",
        image2: "assets/images/151mew.png"
    },
    {
        word: "rayquaza",
        image1: "assets/images/348rayquaza-b.png",
        image2: "assets/images/348rayquaza.png"
    },
    {
        word: "lucario",
        image1: "assets/images/448lucario-b.png",
        image2: "assets/images/448lucario.png"
    },
    {
        word: "arceus",
        image1: "assets/images/493arceus-b.png",
        image2: "assets/images/493arceus.png"
    },
    {
        word: "victini",
        image1: "assets/images/494victini-b.png",
        image2: "assets/images/494victini.png"
    },
    {
        word: "reshiram",
        image1: "assets/images/643reshiram-b.png",
        image2: "assets/images/643reshiram.png"
    },
    {
        word: "kyurem",
        image1: "assets/images/646kyurem-b.png",
        image2: "assets/images/646kyurem.png"
    },
    {
        word: "keldeo",
        image1: "assets/images/647keldeo-b.png",
        image2: "assets/images/647keldeo.png"
    },
    {
        word: "greninja",
        image1: "assets/images/658greninja-b.png",
        image2: "assets/images/658greninja.png"
    },
    {
        word: "sylveon",
        image1: "assets/images/700sylveon-b.png",
        image2: "assets/images/700sylveon.png"
    },
    {
        word: "hoopa",
        image1: "assets/images/720hoopa-b.png",
        image2: "assets/images/720hoopa.png"
    }
]

//Game status, random number application to obtain random word and images, identify letter remaining, and answer array.

var gameStatus = false;
var randomNumber = Math.floor(Math.random()* pokemonArray.length);

var pkmn = pokemonArray[randomNumber].word;
var pkmnImage1 = pokemonArray[randomNumber].image1
var pkmnImage2 = pokemonArray[randomNumber].image2

var lettersRemaining = pkmn.length;
var answerArray = [];

//Key events for the letters input from player.
document.addEventListener("keyup",function(event){

    if(gameStatus){
        letterCheck(event);
    } else {
        init();
    }
});

//Alphabet array requried for letter checking + function for checking if letter pressed is correct.
var alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function letterCheck(guess) {
    if (alphabetArray.indexOf(guess.key) > -1) {
        rightGuessCheck(guess);
    }
}

// Function to check if the user guessed the correct pokémon name.
var winScore = 0;

function rightGuessCheck(guess) {
    if (pkmn.indexOf(guess.key) > -1) {
        rightGuess(guess);
    } else {
        wrongGuess(guess);
    }
}
function rightGuess(guess) {
    if (answerArray.indexOf(guess.key.toUpperCase()) < 0) {
        addRightLetter(guess);
    }
}
function addRightLetter(guess) {
    for (var i = 0; i < pkmn.length; i++) {
        if (guess.key === pkmn[i]) {
            answerArray[i] = guess.key.toUpperCase();
            displayCurrentWord();
            lettersRemaining--;
            
            if (lettersRemaining === 0) {
                winScore++;
                displayWins();
                changeImage();
                addRight();
                displayCurrentWord();
            }
        }
    }
}

//Array for wrong answers + number of guesses
var wrongGuessesMade = [];
var guessesLeft = 9;

function wrongGuess(guess) {
    if (wrongGuessesMade.indexOf(guess.key.toUpperCase()) < 0) {
        addWrongLetter(guess);
    }
}
function addWrongLetter(guess) {
    wrongGuessesMade.push(guess.key.toUpperCase());
    displayGuessesMade();
    guessesLeft--;
    displayGuessesLeft();
    if (guessesLeft === 0) {
        changeImage();
        displayAnswer();
    }
}

//Displays for number of wins, letters guessed, guesses left, current status, random pokémon, pokémon revealed, answers, word color for right and wrong.
function displayWins() {
    var winsDisplays = document.querySelector("#winsDisplay");
    winsDisplays.textContent = winScore;
}
function displayGuessesMade() {
    var guessesMadeDisplay = document.querySelector("#guessesMadeDisplay");
    guessesMadeDisplay.textContent = wrongGuessesMade.join(",");
}
function displayGuessesLeft() {
    var guessesLeftDisplay = document.querySelector("#guessesLeftDisplay");
    guessesLeftDisplay.textContent = guessesLeft;
}

function displayCurrentWord() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.innerHTML = answerArray.join(" ");
}

function displayImage() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = pkmnImage1;
}

function changeImage() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = pkmnImage2;
    gameStatus = false;
}

function displayAnswer() {
    var revealedAnswerDisplay = document.querySelector("#revealedAnswerDisplay");
    revealedAnswerDisplay.textContent = pkmn.toUpperCase();
}

function addCorrect() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.classList.add('correct');
}

function removeCorrect() {
    var currentWordDisplay = document.querySelector("#currentWordDisplay");
    currentWordDisplay.classList.remove('correct');
}

// Star + re-start game.
function init() {
    gameStatus = true;

    randomNumber = Math.floor(Math.random()* pokemonArray.length);
    pkmn = pokemonArray[randomNumber].word;
    pkmnImage1 = pokemonArray[randomNumber].image1;
    pkmnImage2 = pokemonArray[randomNumber].image2;

    lettersRemaining = pkmn.length;

    answerArray = [];

    for (var j = 0; j < pkmn.length; j++){
        if (pkmn[j] === "+"){
            answerArray[j] = "&nbsp";
        } else {
            answerArray[j] = "_"
        }
    }

    lettersRemaining = pkmn.length;
    guessesLeft = 9;
    displayGuessesLeft();
    wrongGuessesMade = [];
    displayGuessesMade();
    displayCurrentWord();
    displayImage();
    revealedAnswerDisplay.textContent = "";

    removeCorrect();

}

