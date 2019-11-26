import axios from 'axios';

//this is basically the same as writing JQuery and writing API calls. This is just getting data from the backend and returning it to the front-end
//this will then hit the book-routes.js file. the full-flow will be as follows: this file (API.js) ==> routes/api/book-routes.js ==> controller/book-controller.js
export const saveBook = bookData => {
  return axios.post('/api/books', bookData);
};

export const getSavedBooks = () => {
  return axios.get('/api/books');
};

export const removeBook = bookId => {
  return axios.delete(`/api/books/${bookId}`);
};

export const searchGoogleBooks = query => {
  return axios.get('https://www.googleapis.com/books/v1/volumes', {
    params: { //axios lets us define the parameter 'q' inside the params object so the resulting query will be 'https:.../v1/volumes?q=something'
      q: query
    }
  });
};

export default {
  saveBook,
  getSavedBooks,
  removeBook,
  searchGoogleBooks
};
