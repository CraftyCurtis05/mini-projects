/* secret-image.js */
const buttonElement = document.getElementById('secret-button');
const imgElement = document.getElementById('secret-img');

const toggleHiddenElement = (domElement) => {
    if (domElement.style.display === 'none') {
        domElement.style.display = 'block';
    } else {
        domElement.style.display = 'none';
    }
}

buttonElement.addEventListener('click', () => {
    toggleHiddenElement(imgElement);
});