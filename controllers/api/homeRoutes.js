const router = require('express').Router();

// Define the root route to render the home page
router.get('/', async (req, res) => {
  try {
    // Assume you have some logic to fetch data, such as cards
    const cards = []; // Replace with actual data fetching logic

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
