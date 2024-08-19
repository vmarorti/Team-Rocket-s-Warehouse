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
    let length = false;
    let forTradeCards;
    let forSaleCards;
    const buyer = await Collector.findOne({ where: { buyer_id: req.session.user_id } });
    if (buyer) {
      forTradeCards = await User.findAll({
        attributes: { exclude: ['password', 'email', 'id'] },
        include: [{
          where: { buyer: buyer.dataValues.id },
          model: ForTrade,
          include: [{ model: Posts }]
        }],
        raw: true,
      });

      forSaleCards = await User.findAll({
        attributes: { exclude: ['password', 'email', 'id'] },
        include: [{
          where: { buyer: req.session.user_id },
          model: ForSale,
          include: [{ model: Posts }]
        }],
        raw: true,
      });

      if (forTradeCards.length + forSaleCards.length > 0) {
        length = true;
      }
    }
    res.render('profile', {
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

// Single card for trading
router.get('/card/:id', withAuth, async (req, res) => {
  try {
    let card = await User.findAll({
      attributes: { exclude: ['password', 'email', 'id'] },
      include: [{
        model: ForTrade,
        include: [{ model: Posts }]
      }],
      raw: true,
      where: { '$fortrades.post.id$': req.params.id }
    });
    card = card[0];
    console.log(card);
    res.render('trade', {
      title: 'Trade',
      card: {
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
  res.render('login', { title: 'Login' });
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
    title: 'About Us',
    team: team,
  });
});

// FAQ route
router.get('/faq', (req, res) => {
  res.render('faq', { title: 'FAQ' });
});

module.exports = router;
