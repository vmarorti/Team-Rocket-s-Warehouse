const router = require('express').Router();

// Home Route
router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    });
});

// Profile Route
router.get('/profile', (req, res) => {
    res.render('profile', {
        title: 'Your Profile'
    });
});

// About Route
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us'
    });
});

// FAQ Route
router.get('/faq', (req, res) => {
    res.render('faq', {
        title: 'Frequently Asked Questions'
    });
});

// CONOR - TEST FOR POKEMON-CARD
router.get('/pokemon-card', (req, res) => {

  res.render('pokemon-card', { title: 'Pokémon Card' });
});

// HOME PAGE POKEMON CARD ROUTE
// Route to display Pokémon cards on the home page
router.get('/', async (req, res) => {
  try {
      const cardData = await Posts.findAll(); // Fetch all cards from the Posts model
      const cards = cardData.map((card) => card.get({ plain: true })); // Serialize data

      // Pass the cards data to the 'home' template, which will use the 'pokemon-card.handlebars' partial
      res.render('home', {
          title: 'Home',
          cards, // Pass the card data to the home template
      });
  } catch (err) {
      console.error('Failed to retrieve card data:', err);
      res.status(500).send('Failed to retrieve card data');
  }
});

module.exports = router;
