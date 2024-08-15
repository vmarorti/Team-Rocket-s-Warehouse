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

module.exports = router;
