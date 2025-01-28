// This will work...
// import resources from 'module.js'
// const { valueA, valueB } = resources;
// OR
// import importedResources from 'module.js';

// This will not work...
// import { valueA, valueB } from 'module.js'

// Import the functions from encryptors.js here.
const encryptors = require('./encryptors.js');

// Import Encryption Functions
const caesarCipher = encryptors.caesarCipher;
const symbolCipher = encryptors.symbolCipher;
const reverseCipher = encryptors.reverseCipher;

// Implement Encryption Functions For Encoding str
const encodeMessage = (str) => {
  return reverseCipher(symbolCipher(caesarCipher(str, 10)));
};

// Implement Encryption Functions For Decoding str
const decodeMessage = (str) => {
    return caesarCipher(symbolCipher(reverseCipher(str)), -10);
};

// User input / output.
const handleInput = (userInput) => {
  const str = userInput.toString().trim();
  let output;
  if (process.argv[2] === 'encode') {
    output = encodeMessage(str);
  } 
  if (process.argv[2] === 'decode') {
    output = decodeMessage(str);
  } 
  
  process.stdout.write(output + '\n');
  process.exit();
}

// Run the program.
process.stdout.write('Enter the message you would like to encrypt...\n> ');
process.stdin.on('data', handleInput);

// Run in terminal:
// $ node super-encoder.js encode
// $ node super-encoder.js decode