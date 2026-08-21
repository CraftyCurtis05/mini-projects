/* Helper supplied for the Promise availability exercise. */

function restockSuccess() {
  return Math.random() > 0.2;
}

function checkAvailability(itemName, distributorName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (restockSuccess()) {
        resolve(itemName);
        return;
      }

      reject(
        new Error(`${itemName} is unavailable from ${distributorName} right now.`)
      );
    }, 1000);
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { checkAvailability };
}

if (typeof window !== "undefined") {
  window.checkAvailability = checkAvailability;
}
