const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, ForTrade, ForSale, Posts, Collector } = require('../models');

// Define the root route to render the home page
router.get('/', async (req, res) => {
  try {
    const forTradeCards = await User.findAll({
      attributes: { exclude: ['password', 'email', 'id'] },
      include: [{
        where: { buyer: null },
        model: ForTrade,
        include: [{ model: Posts }]
      }],
      raw: true,
    });

    const forSaleCards = await User.findAll({
      attributes: { exclude: ['password', 'email', 'id'] },
      include: [{
        where: { buyer: null },
        model: ForSale,
        include: [{ model: Posts }]
      }],
      raw: true,
    });

    console.log(forTradeCards);
    console.log(forSaleCards);

    res.render('home', {
      loggedIn: req.session.loggedIn,
      title: 'Home',
      forTradeCards, // Pass the data to the template
      forSaleCards
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Profile route
router.get('/profile', withAuth, async (req, res) => {
  try {
    //carda
    let length1 = false;
    let length2 = false;
    let length3 = false;
    let forTradeCards;
    let forSaleCards;
    let myPendingTrades;
    //all cards with approved trade or have been bought
    const buyer = await Collector.findOne({where: {buyer_id: req.session.user_id}});
    if(buyer){
      forTradeCards = await User.findAll({
        attributes:{ exclude: [ 'password', 'email','id']},
        include: [{where: {buyer: buyer.dataValues.id, trade: true},
          model: ForTrade, include:[{model: Posts}]
        }],raw: true,

      })
      forSaleCards = await User.findAll({
        attributes:{exclude: [ 'password', 'email','id']},
        include: [{where: {buyer: buyer.dataValues.id},
          model: ForSale, include:[{model: Posts}]
        }],raw: true,

      })

      //all cards that you have sent an offer for trade
     myPendingTrades = await User.findAll({
      attributes:{ exclude: [ 'password', 'email','id']},
      include: [{where: {buyer: buyer.dataValues.id},
        model: ForTrade, include:[{model: Posts}]
      }],raw: true,

    })


      if(forTradeCards.length + forSaleCards.length > 0){
        length1 = true;
      }
      
      if(myPendingTrades.length > 0){
        length2 = true;
      }
    }
    //all card that user has up for trade
    const upForTrade = await User.findAll({
      attributes:{ exclude: [ 'password', 'email','id']},
      include: [{where: {seller_id: req.session.user_id},
        model: ForTrade, include:[{model: Posts}]
      }],raw: true,

    })

    if(upForTrade.length > 0){
      length3 = true;
    }
    console.log(myPendingTrades);
    console.log(upForTrade);

    res.render('profile', {
      loggedIn: req.session.loggedIn,
      name: req.session.name,
      email: req.session.email,
      title: 'Your Profile',
      forTradeCards,
      forSaleCards,
      length1,
      length2,
      length3,
      myPendingTrades,
      upForTrade
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//single card for trading
router.get('/card/:id', withAuth, async (req, res) => {
  try {
    let card = await User.findAll({
      attributes:{ exclude: [ 'password', 'email','id']},
      include: [{
        model: ForTrade, include:[{model: Posts,}]
      }],raw: true,where:{'$fortrades.post.id$': req.params.id}
    })
    card = card[0]
    console.log(card);
    res.render('trade', {
      loggedIn: req.session.loggedIn,
      title: 'trade',
      card:{
        image: card['fortrades.post.pokemon_image'],
        name: card.name,
        condition: card['fortrades.post.condition'],
        postid: card['fortrades.post.id']
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
// Login route
router.get('/login', (req, res) => {
  res.render('login', { loggedIn: req.session.loggedIn, title: 'Login' });
});

// About route
router.get('/about', (req, res) => {
  const team = [
    { name: 'Alejandro Meza', role: 'Lead Developer', sprite: 'gible.gif' },
    { name: 'Christopher Romero', role: 'Lead Developer', sprite: 'sandshrew.gif' },
    { name: 'Mariana Ortiz', role: 'UI/UX Lead Design', sprite: 'cubone.gif' },
    { name: 'Conor Lee', role: 'Project Manager & Full Stack Developer', sprite: 'hitmonlee.gif' },
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
