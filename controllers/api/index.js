const router = require('express').Router();
const homeRoutes = require('../homeRoutes'); // Adjusted path w/ ..

router.use('/', homeRoutes); // root

module.exports = router;
