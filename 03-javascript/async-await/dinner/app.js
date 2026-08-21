/* Dinner Async/Await: start the independent cooking tasks together. */

const dinner =
  typeof window !== "undefined"
    ? window.dinnerFunctions
    : require("./library.js");

async function cookDinner() {
  return Promise.all([
    dinner.steamBroccoli(),
    dinner.cookRice(),
    dinner.bakeChicken(),
    dinner.cookBeans(),
  ]);
}

const cookButton =
  typeof document !== "undefined"
    ? document.querySelector("#cook-button")
    : null;

if (cookButton) {
  const status = document.querySelector("#status");

  cookButton.addEventListener("click", async () => {
    status.textContent = "Cooking everything at the same time...";

    const foods = await cookDinner();
    status.textContent = `Dinner is served: ${foods.join(", ")}.`;
  });
} else {
  cookDinner().then(foods => {
    console.log(`Dinner is served: ${foods.join(", ")}.`);
  });
}
