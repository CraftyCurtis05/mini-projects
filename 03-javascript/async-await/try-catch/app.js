/* Async Try/Catch: keep the success and error paths in one readable function. */

const cookSouffle =
  typeof window !== "undefined"
    ? window.cookBeanSouffle
    : require("./library.js");

async function hostDinnerParty() {
  try {
    const result = await cookSouffle();
    return `${result} is served!`;
  } catch (error) {
    return `${error.message} Ordering a pizza instead.`;
  }
}

const cookButton =
  typeof document !== "undefined"
    ? document.querySelector("#cook-button")
    : null;

if (cookButton) {
  const status = document.querySelector("#status");

  cookButton.addEventListener("click", async () => {
    status.textContent = "Fingers crossed... the souffle is in the oven.";
    status.textContent = await hostDinnerParty();
  });
} else {
  hostDinnerParty().then(message => console.log(message));
}
