/**
 * Challenge Statement:
 * In some English words, a letter appears more than once.
 * Search through a sample of text to find the word with a letter that is repeated more times than
 * any other letter is repeated in any other word. If there is a tie between two words, then
 * choose the first word in the text sample.
 * 
 * The text sample will contain only the alphabetic characters ("a" through "z" and "A" through
 * "Z"), spaces, and punctuation marks. A letter is considered to be the same letter regardless of
 * whether it appears in uppercase or lowercase. The words will be separated by spaces, and any
 * punctuation marks should be disregarded.
 * 
 * Write a function that accepts the string path to a sample text file as its argument,and returns
 * the correct word from the sample text as its output. Each sample text is stored in a text file.
 */

const fs = require('fs');

/**
 * readInput function accepts callback function.
 * If an error is encountered it's caught and the error message is output.
 * callbackFn is invoked with data from file if err not encountered.
 */

function readInput(callbackFn) {
  const [ , , inputFile ] = process.argv;

  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }

    callbackFn(data);
  });
}

readInput((data) => {
  const input = data;
  const inputArray = input.trim().split(/\s/);
  let output;
  let recurrences = 0;

  // Loop through each word in inputArray
  inputArray.forEach((element) => {
    const word = element;
    const checkedLetters = [];
    const letters = element.split('');

    // Loop through each letter in current word.
    letters.forEach((letter) => {
      /**
      * Check if letter is a word character (not punctuation) and not already checked
      * get letter matches in the word and push letter to checkedLetters array
      */

      if (/\w/.test(letter) && !checkedLetters.includes(letter)) {
        const matches = word.match(RegExp(letter, 'gi')).length;

        checkedLetters.push(letter);

        /**
        * If the current letter matches exceeds the number of reccurrences
        * update recurrences with matches and output with current word.
        */

        if (matches > recurrences) {
          recurrences = matches;
          output = word;
        }
      }
    });
  });

  console.log(output);
});

