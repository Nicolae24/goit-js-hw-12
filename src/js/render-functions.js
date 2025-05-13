
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const galleryEl = document.querySelector('.js-gallery');

const lightbox = new SimpleLightbox('.js-gallery .gallery-link', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="image-info">
        <p>Likes: <span>${likes}</span></p>
        <p>Views: <span>${views}</span></p>
        <p>Comments: <span>${comments}</span></p>
        <p>Downloads: <span>${downloads}</span></p>
      </div>
    </li>`
    ).join('');

    galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    galleryEl.innerHTML = '';
}

export function showLoader(element) {
    element.classList.remove('hidden');
}

export function hideLoader(element) {
    element.classList.add('hidden');
}

export function showLoadMoreButton(button) {
    button.classList.remove('hidden');
}

export function hideLoadMoreButton(button) {
    button.classList.add('hidden');
}




