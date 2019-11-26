const router = require('express').Router();

const {
  getSavedBooks,
  saveBook,
  removeBook
} = require('../../controllers/book-controller');

// GET and POST at /api/books

router
  .route('/')
  .get(getSavedBooks) //using the getSavedBooks module from the controller/book-controller.js file
  .post(saveBook); //using the saveBook module from the controller/book-controller.js file

// DELETE at /api/books/:id

router.route('/:id').delete(removeBook); //using the removeBook module from the controller/book-controller.js file

module.exports = router;
