const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User, ForTrade, ForSale, Posts, Collector} = require('../models');

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
      attributes:{exclude: [ 'password', 'email','id']},
      include: [{where: {buyer:null},
        model: ForSale, include:[{model: Posts}]
      }],raw: true,

    })
    console.log(forTradeCards);
    console.log(forSaleCards);
    // Render the home page with the data
    res.render('home', {
      loggedIn: req.session.loggedIn,
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


// Profile route
router.get('/profile', withAuth, async (req, res) => {
  console.log(req.session.user_id);
  try {
    let length = false;
    let forTradeCards;
    let forSaleCards;
    const buyer = await Collector.findOne({where: {buyer_id: req.session.user_id}});
    if(buyer){
      forTradeCards = await User.findAll({
        attributes:{ exclude: [ 'password', 'email','id']},
        include: [{where: {buyer: buyer.dataValues.id},
          model: ForTrade, include:[{model: Posts}]
        }],raw: true,

      })
      // join forsale and posts where forsale.buyer is null
      forSaleCards = await User.findAll({
        attributes:{exclude: [ 'password', 'email','id']},
        include: [{where: {buyer: req.session.user_id},
          model: ForSale, include:[{model: Posts}]
        }],raw: true,

      })

      console.log(forTradeCards);
      console.log(forSaleCards);

      if(forTradeCards.length + forSaleCards.length > 0){
        length = true;
      }
    }
    res.render('profile', {
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      email: req.session.email,
      title: 'Your Profile',
      forTradeCards,
      forSaleCards,
      length
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
  const team = [
    { name: 'Alejandro Meza', role: 'Lead Developer' },
    { name: 'Christopher Romero', role: 'Lead Developer' },
    { name: 'Mariana Ortiz', role: 'UI/UX Lead Design' },
    { name: 'Conor Lee', role: 'Project Manager & Full Stack Developer' },
  ];

  res.render('about', {
    loggedIn: req.session.loggedIn,
    title: 'About Us',
    team: team,
  });
});

// FAQ route
router.get('/faq', (req, res) => {
  res.render('faq', { loggedIn: req.session.loggedIn, title: 'FAQ' });
});

module.exports = router;