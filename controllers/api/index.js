const router = require('express').Router();
const homeRoutes = require('./homeRoutes'); // Import the home routes

router.use('/', homeRoutes); // Use the home routes for the root path

module.exports = router;
