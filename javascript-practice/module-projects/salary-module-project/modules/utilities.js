/* modules/utilities.js */
// Define and export a function in utilities.js called formatNumber()
// This function should have a number parameter and should return a string representation of that number value with a comma (,) character between every 3rd digit

export const formatNumber = number => {
    // Get rid of the decimals and convert to a string.
    let numStr = String(Math.floor(number));
  
    // Starting 3 from the end, add a comma every 3 digits.
    for (let i = numStr.length - 3; i > 0; i -= 3) {
      numStr = numStr.slice(0, i) + ',' + numStr.slice(i);
    }
  
    // And return!
    return numStr;
  }