import './css/styles.css';

const axios = require('axios').default;

const pageForm = document.querySelector('form.search-form');
const pageInput = document.querySelector('input[name="searchQuery"]');
const searchButton = document.querySelector('button[type="submit"]');

const galleryPlace = document.querySelector('div.gallery');

const inputValue = pageInput.value;
const joinedInputValue = inputValue.split(' ').join('+');

async function searchPictures() {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=26513861-7ba7a860ef1b492cf85cf7d68&q=${joinedInputValue}&image_type=photo&orientation=horizontal&safesearch=true`,
    );
    return response;
  } catch (error) {
    return error;
  }
}


function createGalleryTags(backendObjects) {
  const markup = backendObjects
    .map(
      backendObj =>
        `<div class="photo-card">
          <img src="${backendObj.pageURL}" alt="${backendObj.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>${backendObj.likes}
            </p>
            <p class="info-item">
              <b>Views</b>${backendObj.views}
            </p>
            <p class="info-item">
              <b>Comments</b>${backendObj.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>${backendObj.downloads}
            </p>
          </div>
        </div>`,
    )
    .join('');
  galleryPlace.innerHTML = markup;
}


const galleryGenerator = event => {
  event.preventDefault();
  searchPictures()
    .then(response => {
      createGalleryTags(response.data.hits);
      console.log(response.data.hits);
      console.log(response.data.hits[0].pageURL);
    })
    .catch(error => {
      console.log(error);
    });
};

searchButton.addEventListener('click', galleryGenerator);
