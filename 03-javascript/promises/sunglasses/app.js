const {checkAvailability} = require('./library.js');

const onFulfill = (itemsArray) => {
  console.log(`Items checked: ${itemsArray}`);
  console.log(`Every item was available from the distributor. Placing order now.`);
};

const onReject = (rejectionReason) => {
	console.log(rejectionReason);
};

// Write your code below:
// Create three variables each assigned to a separate promise:
// checkSunglasses should be assigned the value returned from invoking checkAvailability() with 'sunglasses' as its first argument and 'Favorite Supply Co.' as its second argument.
const checkSunglasses = checkAvailability('sunglasses', 'Favorite Supply Co.');

// checkPants should be assigned the value returned from invoking checkAvailability() with 'pants' as its first argument and 'Favorite Supply Co.' as its second argument.
const checkPants = checkAvailability('pants', 'Favorite Supply Co.');

// checkBags should be assigned the value returned from invoking checkAvailability() with 'bags' as its first argument and 'Favorite Supply Co.' as its second argument.
const checkBags = checkAvailability('bags', 'Favorite Supply Co.');

// Invoke Promise.all() with an array containing checkSunglasses, checkPants, and checkBags.
Promise.all([checkSunglasses, checkPants, checkBags])
// Chain a .then() to the promise returned from Promise.all(). You should pass in onFulfill to serve as the success handler.
  .then(onFulfill)
  .catch(onReject);


// let myPromises = Promise.all([returnsPromOne(), returnsPromTwo(), returnsPromThree()]);
// myPromises
//   .then((arrayOfValues) => {
//     console.log(arrayOfValues);
//   })
//   .catch((rejectionReason) => {
//     console.log(rejectionReason);
//   });