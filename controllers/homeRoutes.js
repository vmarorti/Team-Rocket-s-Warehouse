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

// CONOR - ADDITIONAL ROUTES FOR PROFILE, ABOUT, FAQ, LOGIN

// Authentication middleware
function withAuth(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }
  next();
}

// Profile route
router.get('/profile', withAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user_id, {
      include: [{ model: Posts }],
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('profile', {
      title: 'Your Profile',
      username: user.name,
      email: user.email,
      cardCollection: user.Posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Login route
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// About route
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// FAQ route
router.get('/faq', (req, res) => {
  res.render('faq', { title: 'FAQ' });
});

module.exports = router;