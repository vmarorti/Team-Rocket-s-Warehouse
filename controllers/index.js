const router = require('express').Router();
const apiRoutes = require('./api'); // Import the API routes

router.use('/', apiRoutes); // Use the API routes for the root path

module.exports = router;
