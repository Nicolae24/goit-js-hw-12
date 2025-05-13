

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
} from './js/render-functions.js';

const formEl = document.querySelector('.js-form');
const loaderEl = document.querySelector('.js-loader');
const galleryEl = document.querySelector('.js-gallery');
const loadMoreBtn = document.querySelector('#load-more-button');

let query = '';
let page = 1;
const perPage = 15;

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(event) {
    event.preventDefault();
    query = event.target.elements['search-text'].value.trim();
    page = 1;

    if (!query) {
        iziToast.warning({
            message: 'Please enter a search term!',
            position: 'topRight',
        });
        return;
    }

    clearGallery();
    hideLoadMoreButton(loadMoreBtn);
    showLoader(loaderEl);

    try {
        const data = await getImagesByQuery(query, page, perPage);

        if (data.hits.length === 0) {
            iziToast.info({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
            return;
        }

        createGallery(data.hits);

        const totalPages = Math.ceil(data.totalHits / perPage);
        // Показуємо кнопку лише якщо є наступні сторінки
        if (page < totalPages) {
            showLoadMoreButton(loadMoreBtn);
        } else {
            hideLoadMoreButton(loadMoreBtn);
        }
    } catch (error) {
        iziToast.error({
            message: `Error: ${error.message}`,
            position: 'topRight',
        });
    } finally {
        hideLoader(loaderEl);
        formEl.reset();
    }
}

async function onLoadMoreClick() {
    page += 1;
    showLoader(loaderEl);

    try {
        const data = await getImagesByQuery(query, page, perPage);
        createGallery(data.hits);

        const totalPages = Math.ceil(data.totalHits / perPage);
        if (page >= totalPages) {
            hideLoadMoreButton(loadMoreBtn);
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
        }

        smoothScroll();
    } catch (error) {
        iziToast.error({
            message: `Error: ${error.message}`,
            position: 'topRight',
        });
    } finally {
        hideLoader(loaderEl);
    }
}

function smoothScroll() {
    const { height: cardHeight } = galleryEl
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}


