#!/usr/bin/env node

console.log("Welcome to the Number Guessing Game!");
console.log("I'm thinking of a number between 1 and 100.");
// console.log("You have 5 chances to guess the correct number");

console.log("Please select the difficulty level:");
console.log("1. Easy(10 chances)");
console.log("2. Easy(5 chances)");
console.log("3. Easy(3 chances)");

const readline = require("readline")
let chances = 0;

const r1 = readline.createInterface({
    input: process.stdin,   
    output: process.stdout
})

r1.question("Enter your choice (1, 2, or 3): ", function(level) {
    if(level == '1') {
        chances = 10;
    } else if(level == '2') {
        chances = 5;
    } else if(level == '3') {
        chances = 3;
    } else {
        console.log("Invalid choice. Defaulting to Easy(10 chances).");
        chances = 10;
    }

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    r1.question("Enter your guess:", function guessNumber(guess) {
        attempts++;
        const number = Number(guess);
        if(number == randomNumber) {
            console.log("Congratulations! You've guessed the correct number on attempt " + attempts + "!");
            r1.close();
        }
        else if(attempts >= chances) {
            console.log(`Sorry, you've used all your chances. The correct number was ${randomNumber}.`);
            r1.close();
        }else{
            if(number < randomNumber) {
                // console.log("Your guess is too low.");
                r1.question("Your guess is too low. Try again:", guessNumber);
                return;
            }
            if(number > randomNumber) {
                // console.log("Your guess is too high.");
                r1.question("Your guess is too high. Try again:", guessNumber);
                return;
            }
            r1.question("Wrong guess. Try again:", guessNumber);
        }
    })
});


