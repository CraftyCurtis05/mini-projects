/* secret-messages.js */ 
import { toggleHiddenElement, changeToFunkyColor } from '../modules/dom-functions.js';
// OR
// import domFunctions from '../modules/dom-functions.js';
// const { toggleHiddenElement, changeToFunkyColor } = domFunctions;

const buttonElement = document.getElementById('secret-button');
const pElement = document.getElementById('secret-p');

// const toggleHiddenElement = (domElement) => {
//     if (domElement.style.display === 'none') {
//         domElement.style.display = 'block';
//     } else {
//         domElement.style.display = 'none';
//     }
// }

buttonElement.addEventListener('click', () => {
    toggleHiddenElement(pElement);
    changeToFunkyColor(buttonElement);
});