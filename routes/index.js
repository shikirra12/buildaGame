const express = require('express');
const fs = require('fs');
const router = express.Router();
let words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");


let randomWord = words[Math.floor(Math.random() * words.length)];
let letterGuessed = [];
let underscores = [];
let obj = {};
let numGuess = 8;
let wordToGuess = randomWord.split('');
let newWord = "";

wordToGuess.forEach(function () {
  underscores.push(' _ ');
});


function gameStart() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  letterGuessed = [];
  underscores = [];
  obj = {};
  numGuess = 8;
  wordToGuess = randomWord.split('');
  newWord = "";

  wordToGuess.forEach(function () {
    underscores.push(' _ ');
  });
};

router.get("/",  function(req, res) {
  // let newLetter = req.body.letter;
    // choose a random word
    // randomWord = words[Math.floor(Math.random() * words.length)];
    // makes individual characters of the word
      // wordToGuess = randomWord.slice('');
    //  underscores = [];
    // should change letter from randomWord to underscores

  console.log(wordToGuess);
  console.log(underscores);
     obj = {
       word: underscores,
       attempts: numGuess,
      //  letter: newLetter,
       letterGuessed: letterGuessed

    }

  res.render("words", {obj: obj});
});

router.post("/", function(req, res) {
  let newLetter = req.body.letter;
  console.log(newLetter, "This is a letter");
  // makes sure user puts in 1 letter at a time and is not a symbol
  req.checkBody("letter", "1 letter at a time.").isLength();
  req.checkBody("letter", "cannot be a symbol.").isAlpha();

  let errors = req.getValidationResult();
    let messages = [];
// pushes the error message to the array
    errors.then(function(allErrors){
      allErrors.array().forEach(function(error){
        messages.push(error.msg);
      });
        })
    let match = false;

      for (var i = 0; i < wordToGuess.length; i++) {
        if (newLetter === wordToGuess[i]) {
          match = true
          numGuess == numGuess
          underscores[i] = wordToGuess[i];
          letterGuessed.push(newLetter);
        }
      }
      console.log(underscores.toString());

      console.log(wordToGuess.toString());

      if (newLetter == letterGuessed) {
        numGuess == numGuess
      }

      //  underscoresWord = underscores.toString();
      // for (var i = 0; i < underscoresWord.length; i++) {
      //   if (underscores[i] === ",") {
      //   newWord = underscoresWord.remove(underscores[i])
      //   }
      // }
      // console.log("this is new word", newWord);

      if (underscores.toString() === wordToGuess.toString()){
        res.redirect('/win');
        req.session.destroy();
        gameStart();
        console.log("shit worked");
      }

      if (!match) {
      numGuess --;
    }

     if (numGuess == 0) {
      res.redirect('lose');
      req.session.destroy();
      gameStart();
    }


    obj = {
      word: underscores,
      attempts: numGuess,
      letter: newLetter,
      letterGuessed: letterGuessed,
      error: messages
   }
    res.redirect("/");

    // res.render("words", {obj: obj})
});

router.get('/lose', function(req, res) {
  res.render('lose');
});

router.post('/lose', function(req, res) {
  req.session.destroy();
  gameStart();
  res.redirect('/');
});

router.get('/win', function(req, res) {
  res.render('win');
});

router.post('/win', function(req, res) {
  req.session.destroy();
  gameStart();
  res.redirect('/');
});

// router.post("/", function(req, res) {
//
//   // makes sure user puts in 1 letter at a time and is not a symbol
//   req.checkbody.letterGuessed("letterGuessed", "1 letter at a time.").isLength(min: 1, max:1);
//   req.checkbody.letterGuessed("letterGuessed", "cannot be a symbol.").isAlpha();
//
//   let errors = req.getValidationResult();
//       let messages = [];
//
//   // pushes the error messages to message array each time it occurs
//     errors.then(function() {
//       wordToGuess.array().forEach(function(error) {
//         messages.push(error.msg);
//       });
//
//       let match = false;
//
//       if (letterGuessed === wordToGuess) {
//         match == true
//         numGuess
//         letter.push(letterGuessed);
//       } else {
//         letterGuessed == letterGuessed
//         numGuess == numGuess
//       }
//
//       if (!matched) {
//         numGuess --;
//       }
//       obj = {
//         word: underscores,
//         attempts: Array.from(numGuess),
//         letter: letterGuessed
//      }
//
//
//
//     // when game ends
//   if (numGuess == 0 ) {
//     req.redirect("/");
//   } else {
//     letterGuessed === wordToGuess
//     req.redirect("/");
//   }
//
//   req.render("words", obj);
//
//   });
// });

module.exports = router;
