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
const args = process.argv.slice(2);

/**
 * readInput accepts callback function.
 * Tries to invoke and execute the function passed.
 * If an error is encountered it's caught and the error message is output.
 */

function readInput(callbackFn) {
  fs.readFile(args[0], 'utf8', (err, data) => {
    try {
      callbackFn(err, data);
    } catch(e) {
      console.log(e.message);
    }
  });
}

readInput((err, data) => {
  // Throw error if there is one. Triggers catch.
  if (err) throw new Error(err);

  const input = data;
  const inputArray = input.trim().split(/\s/);
  let output;
  let recurrences = 0;

  /**
   * loop through each word
   * letters is an array of each letter in current word that will be looped through.
   */

  inputArray.forEach((element) => {
    const checkedLetters = [];
    // Remove non-word characters
    const word = element.split(/\W/).join('');
    const letters = word.split('');

    /**
    * letters.forEach loops through each letter in current word.
    * matches is how many matches there are in the current word the current letter.
    * Set value of mostRepeatedLetterCount if matches exceeds that current value.
    * Set output to the word that is currently being iterated.
    */

    letters.forEach((letter) => {
      /**
      * If word character and not in checkedLetters array
      * get matches and push to checkedLetters array
      */

      if (/\w/.test(letter) && checkedLetters.indexOf(letter) === -1) {
        const matches = word.match(new RegExp(letter, 'gi'), '').length;

        checkedLetters.push(letter);

        /**
        * If the current letter matches exceeds the number of reccurrences 
        * update recurrences and output with letter matches and word to output
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

