const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
  bookId: { //this ID will be from google and mongo will create its own ID as well
    type: String
  },
  title: {
    type: String
  },
  authors: {
    type: Array
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  link: {
    type: String
  }
});

const Book = mongoose.model('book', BookSchema);

module.exports = Book;
