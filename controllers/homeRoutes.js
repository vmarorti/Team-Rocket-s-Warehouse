const router = require('express').Router();
const { raw } = require('express');
const {User, ForTrade, ForSale, Posts} = require('../models');
const { associations, hasMany } = require('../models/User');

// Define the root route to render the home page
router.get('/', async (req, res) => {
  try {
    // join fortrade, trade and post where fortrade.buyer is null
    const forTradeCards = await User.findAll({
      attributes:{ exclude: [ 'password', 'email','id']},
      include: [{where: {buyer:null},
        model: ForTrade, include:[{model: Posts}]
      }],raw: true,

    })
    // join forsale and posts where forsale.buyer is null
    const forSaleCards = await User.findAll({
      attributes:{ exclude: [ 'password', 'email','id']},
      include: [{where: {buyer:null},
        model: ForSale, include:[{model: Posts}]
      }],raw: true,

    })
    console.log(forTradeCards);
    // Render the home page with the data
    res.render('home', {
      title: 'Home',
      forTradeCards,// Pass the data to the template
      forSaleCards
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

router.get('/pokemon-card', (req, res) => { // ADDED ROUTE FOR POKEMON CARD
  res.render('pokemon-card', { title: 'Pokemon Card' }); // ADDED RENDER METHOD FOR POKEMON CARD PAGE
});


module.exports = router;