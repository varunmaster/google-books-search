const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

router.use('/api', apiRoutes); //this is prefixing the '/api/' in front of all routes so it'll be like '/api/books/getSavedBooks' (books comes from /routes/api/index.js file)

// this is for production use only, if no API routes are hit then serve up the React frontend
router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
