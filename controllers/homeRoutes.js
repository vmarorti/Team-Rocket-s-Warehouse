const router = require('express').Router();
const {FortTade, ForSale, Trade, Posts} = require('../models');

// Define the root route to render the home page
router.get('/', async (req, res) => {
  try {
    // join fortrade, trade and post where fortrade.buyer is null

    // join forsale and posts where forsale.buyer is null

    const cards = [];

    // Render the home page with the data
    res.render('home', {
      title: 'Home',
      cards, // Pass the data to the template
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
