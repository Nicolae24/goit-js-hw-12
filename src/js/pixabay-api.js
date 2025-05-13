
import axios from 'axios';

// const API_KEY = `50248807-4593db0d9cec2666d46b99efe`;
// // axios.defaults.baseURL = 'https://pixabay.com/api/';

// export const getImagesByQuery = async (query, page) => {
//     try {
//         const responce = await axios.get(`https://pixabay.com/api/`, {
//             params: {
//                 key: API_KEY,
//                 q: query,
//                 page: page,
//                 per_page: 15,
//                 image_type: `photo`,
//                 orientation: `horizontal`,
//             },
//         });

//         return responce.data.hits; // Повертаємо масив з зображеннями
//     } catch (error) {
//         console.error(`Error fetching images:`, error);

//     }
// };


const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50248807-4593db0d9cec2666d46b99efe';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PER_PAGE,
    };

    try {
        const response = await axios.get(BASE_URL, { params });
        return response.data;
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Oops! Failed to load images. Please try again later.',
            position: 'topRight',
        });
    }
}

// export async function getImagesByQuery(query, page = 1, perPage = 15) {
//     const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return await response.json();
// }

