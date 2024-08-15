const router = require('express').Router();
const userRoutes = require('./userAccount-routes');
const postRoutes = require('./post-routes');


router.use('/user', userRoutes); // root

module.exports = router;
