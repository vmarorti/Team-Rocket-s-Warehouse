const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// Home page
router.get('/', async (req, res) => {
  try {
    const cards = []; // Your logic to fetch cards
    res.render('home', {
      cards,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ all: true }],
    });

    const user = userData.get({ plain: true });
    res.render('profile', {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// About page
router.get('/about', (req, res) => {
  res.render('about');
});

// FAQ page
router.get('/faq', (req, res) => {
  res.render('faq');
});

// Login and Signup page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Handle login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Handle signup
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;

      res.json({ user: newUser, message: 'Account created successfully!' });
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
