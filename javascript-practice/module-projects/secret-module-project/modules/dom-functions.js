/* dom-functions.js */
export const toggleHiddenElement = (domElement) => {
    if (domElement.style.display === 'none') {
        domElement.style.display = 'block';
    } else {
        domElement.style.display = 'none';
    }
}

export const changeToFunkyColor = (domElement) => {
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;

    domElement.style.background = `rgb(${r}, ${g}, ${b})`;
}

// OR 
// const resources = { 
//   toggleHiddenElement, 
//   changeToFunkyColor
// }
// export default resources;
// OR
// export { toggleHiddenElement, changeToFunkyColor };

