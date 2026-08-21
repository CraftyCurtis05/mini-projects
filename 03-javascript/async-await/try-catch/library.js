/* Promise helper for the async try/catch exercise. */

function randomSuccess() {
  return Math.random() < 0.5;
}

function cookBeanSouffle() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (randomSuccess()) {
        resolve("Bean souffle");
        return;
      }

      reject(new Error("Dinner is ruined!"));
    }, 1000);
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = cookBeanSouffle;
}

if (typeof window !== "undefined") {
  window.cookBeanSouffle = cookBeanSouffle;
}
