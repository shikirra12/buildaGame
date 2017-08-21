const express = require('express');
const fs = require('fs');
const router = express.Router();
let words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

let letterGuessed = [];
let underscores = [];
let obj;
let numGuess = 8;
let messages = [];


router.get("/", function(req, res) {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordToGuess = randomWord.split();

  // should change letter from randomWord to underscores
  for (var i = 0; i < wordToGuess.length; i++) {
    underscores += wordToGuess;
    // creating individual letters for the word
    wordToGuess.charAt();
    // the letter guess from the input should push the information to the right array based off of the correct input
    if (letterGuessed == wordToGuess) {
      numGuess = numGuess
      letterGuessed.push(wordToGuess);
    // } else if {
    //   numGuess -= numGuess
    //   letterGuessed.push();
    // } else {
      letterGuessed == letterGuessed
      numGuess == numGuess;
    }
  }

  let hey = {
  greeting: "hello"
  }
  res.render("words", {hey});
});


router.post("/", function(req, res) {

  // makes sure user puts in 1 letter at a time and is not a symbol
  req.checkbody.letterGuessed("letterGuessed", "1 letter at a time.").isLength('max:1');
  req.checkbody.letterGuessed("letterGuessed", "").isAlpha();

  let errors = req.getValidationResult();
  // pushes the error messages to message array each time it occurs
    errors.then(function() {
      wordToGuess.array().forEach(function(error) {
        messages.push(error.msg);
      });
    })

  // places the information into the layout mustache
    let obj = {
      errors : messages,
      lettersguessed: req.body.letterGuessed,
      wordtoguess: req.body.wordToGuess,
      // attempts: req.body.numGuess
    }
    // when game ends
  if (numGuess == 0 || letterGuessed === wordToGuess) {
    req.redirct("/");
    // how to include form with button to restart the game
  }

  req.render("words");

  });
// });

module.exports = router;
