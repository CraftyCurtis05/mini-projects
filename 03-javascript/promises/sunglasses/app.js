/* Sunglasses Promises: check several distributor items at the same time. */

const availabilityCheck =
  typeof window !== "undefined"
    ? window.checkAvailability
    : require("./library.js").checkAvailability;

async function checkOrder() {
  const checks = [
    availabilityCheck("sunglasses", "Favorite Supply Co."),
    availabilityCheck("pants", "Favorite Supply Co."),
    availabilityCheck("bags", "Favorite Supply Co."),
  ];

  return Promise.all(checks);
}

const checkButton =
  typeof document !== "undefined"
    ? document.querySelector("#check-button")
    : null;

if (checkButton) {
  const status = document.querySelector("#status");

  checkButton.addEventListener("click", async () => {
    status.textContent = "Checking sunglasses, pants, and bags...";

    try {
      const items = await checkOrder();
      status.textContent = `Everything is available: ${items.join(", ")}.`;
    } catch (error) {
      status.textContent = `${error.message} Try the check again.`;
    }
  });
} else {
  checkOrder()
    .then(items => console.log(`Everything is available: ${items.join(", ")}.`))
    .catch(error => console.log(error.message));
}
