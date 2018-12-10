var express = require('express');
var router = express.Router();

/* Home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to Schmocial' });
});

/* Login page.*/
router.get('/signin', function(req, res, next) {
  res.render('login', { title: 'Welcome to Schmocial' });
});

/*  Login */
router.post('/signin', function(req, res, next) {
  res.render('index', { title: 'Welcome to Schmocial' });
});

/* Sign up on Schmocial. */
router.post('/signup', function(req, res, next) {
  res.render('index', { title: 'Welcome to Schmocial' });
});



module.exports = router;
