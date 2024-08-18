const router = require('express').Router();
const userRoutes = require('./userAccount-routes');
const postRoutes = require('./post-routes');
const fortradeRoutes = require('./fotrade-routes');
const forSale = require('./forsale-routes');


router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/fortrade', fortradeRoutes);
router.use('/post', postRoutes);
router.use('/forsale', forSale);


module.exports = router;
