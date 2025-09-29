// Initialize game variables
let secretNumber; // The number the player needs to guess
let attempts;     // Number of guesses the player has made
let score = 0;    // Player's score, incremented on correct guesses

// Function to start or reset the game
function playGame() {
    // Generate a new secret number between 1 and 100
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    // Clear previous feedback and guess input
    document.getElementById("feedback").textContent = "";
    document.getElementById("guessInput").value = "";
}

// Function to confirm player's name and begin the game
function startGame() {
    const nameInput = document.getElementById("nameInput").value.trim();

    // Check if a name was entered
    if (nameInput) {
        // Save the player's name to local storage
        localStorage.setItem("playerName", nameInput);

        // Display the player's name on the screen
        document.getElementById("playerDisplay").textContent = `Player: ${nameInput}`;

        // Start the guessing game
        playGame();
    } else {
        // Alert if no name was entered
        alert("Please enter your name to start the game.");
    }
}

// Function to check the player's guess
function checkGuess() {
    const guess = Number(document.getElementById("guessInput").value);
    attempts++; // Increment the number of attempts

    // Validate the guess
    if (!guess || guess < 1 || guess > 100) {
        document.getElementById("feedback").textContent = "Please enter a number between 1 and 100.";
        return;
    }

    // Check if the guess is correct
    if (guess === secretNumber) {
        score++; // Increase score for correct guess

        // Retrieve the player's name from local storage
        const playerName = localStorage.getItem("playerName") || "Player";

        // Display success message and update score
        document.getElementById("feedback").textContent = `Correct, ${playerName}! You guessed it in ${attempts} tries.`;
        document.getElementById("scoreDisplay").textContent = `Score: ${score}`;
    } else if (guess < secretNumber) {
        // Hint: guess is too low
        document.getElementById("feedback").textContent = "Too low. Try again!";
    } else {
        // Hint: guess is too high
        document.getElementById("feedback").textContent = "Too high. Try again!";
    }
}

// Function to restart the game with a new number
function restartGame() {
    playGame();
}

// Automatically run when the page loads
window.onload = function () {
    // Retrieve stored player name from local storage
    const storedName = localStorage.getItem("playerName");

    // If a name exists, greet the returning player
    if (storedName) {
        document.getElementById("playerDisplay").textContent = `Welcome back, ${storedName}!`;
    }
};
