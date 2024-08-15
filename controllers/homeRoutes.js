const router = require('express').Router();

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
