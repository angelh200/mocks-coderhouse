const express = require('express');
const router = express.Router();

// Main route
router.get('/', (req, res) => {
  // if(!req.session.user) return res.redirect('/login');
  res.render('main', req.session.user);
});

router.get('/login', (req, res) => {
  if(req.session.user) return res.redirect('/');
  res.render('login');
});

router.get('/logout', (req, res) => {
  res.render('logout', req.session.user);
})

module.exports = router;