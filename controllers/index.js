const router = require('express').Router();
const apiRoutes = require('./api'); // Import the API routes

router.use('/api', apiRoutes); // Use the API routes for the root path
router.use('/', apiRoutes);

module.exports = router;
