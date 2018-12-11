var express = require('express');
var router = express.Router();

/* Home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Welcome to Schmocial' });
});

//Middleware Protection
function verifyAuth(req, res, next){
	if(req.isAuthenticated()) next()
	else res.redirect("/signin")
}
/*
//Middleware Protection
function verifyAuth2(req, res, next){
	if(!req.isAuthenticated()) next()
	else res.redirect("/home")
}*/

/* Login page.*/
router.get('/signin', function(req, res) {
  res.render('login', { title: 'Welcome to Schmocial' });
});

/* Login page.*/
router.get('/home',verifyAuth, function(req, res) {
  res.render('index', { title: 'Welcome to Schmocial User' });
});



module.exports = router;
