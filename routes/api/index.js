//this file is for scalability. in the event that we have addtl routes files, we can just add it here

const router = require('express').Router();
const bookRoutes = require('./book-routes');

router.use('/books', bookRoutes); //we are using the book-routes.js file and appending '/books/' to the routes

module.exports = router;
