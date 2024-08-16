const router = require('express').Router();
const {ForTrade, ForSale, Posts} = require('../models');

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

// ADDITIONAL ROUTES FOR PROFILE, ABOUT, FAQ

router.get('/profile', (req, res) => {
  res.render('profile', { title: 'Your Profile' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

router.get('/faq', (req, res) => {
  res.render('faq', { title: 'FAQ' });
});

module.exports = router;