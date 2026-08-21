/* Small Promise helpers used by the dinner async/await exercise. */

function makeFood(name) {
  return new Promise(resolve => {
    setTimeout(() => resolve(name), 1000);
  });
}

function cookBeans() {
  return makeFood("beans");
}

function steamBroccoli() {
  return makeFood("broccoli");
}

function cookRice() {
  return makeFood("rice");
}

function bakeChicken() {
  return makeFood("chicken");
}

const dinnerFunctions = {
  cookBeans,
  steamBroccoli,
  cookRice,
  bakeChicken,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = dinnerFunctions;
}

if (typeof window !== "undefined") {
  window.dinnerFunctions = dinnerFunctions;
}
