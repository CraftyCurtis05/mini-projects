let {cookBeans, steamBroccoli, cookRice, bakeChicken} = require('./library.js')

// Await Promise.all():
async function serveDinnerAgain(){
  let foodArray = await Promise.all([steamBroccoli(), cookRice(), bakeChicken(), cookBeans()]); 
  
  console.log(`Dinner is served. We're having ${foodArray[0]}, ${foodArray[1]}, ${foodArray[2]}, and ${foodArray[3]}.`);
}

serveDinnerAgain();

let {cookBeans, steamBroccoli, cookRice, bakeChicken} = require('./library.js')


// Handling Independent Promises: 
async function serveDinner() {
 const vegetablePromise = steamBroccoli();
 const starchPromise = cookRice();
 const proteinPromise = bakeChicken();
 const sidePromise = cookBeans();
 console.log(`Dinner is served. We're having ${await vegetablePromise}, ${await starchPromise}, ${await proteinPromise}, and ${await sidePromise}.`);
}

serveDinner();