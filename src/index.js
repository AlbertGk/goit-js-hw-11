import './css/styles.css';

const axios = require('axios').default;

const pageForm = document.querySelector('form.search-form');
const pageInput = document.querySelector('input[name="searchQuery"]');
const searchButton = document.querySelector('button[type="submit"]');

const inputValue = pageInput.value;
const joinedInputValue = inputValue.split(' ').join('+');

async function searchPictures(joinedInputValue) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=26513861-7ba7a860ef1b492cf85cf7d68&q=${joinedInputValue}&image_type=photo`,
    );
    return response;
  } catch (error) {
    return error;
  }
}

const galleryGenerator = (event) => {
  event.preventDefault();
  searchPictures().then(response => {
    console.log(response);
  })
    .catch(error => {
      console.log(error);
    })
}


searchButton.addEventListener('click', galleryGenerator);