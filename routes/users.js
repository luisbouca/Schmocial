var express = require('express');
var router = express.Router();
var passport = require('passport')
var axios = require('axios')
var jwt = require('jsonwebtoken')

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//Get Login Page
router.get('/signin', (req, res)=>{
	Users.list()
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//Post Login
router.post('/signin', async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {     
		try {
			if(err || !user){
				if(err){
					return next(err);
				}else{
					return next(new Error(info.message))//TODO
				} 
			}
			req.login(user, { session : false }, async (error) => {
				if( error ) return next(error)
				var myuser = { _id : user._id, email : user.email };
				// Geração do token
				var token = jwt.sign({ user : myuser },'dweb2018');
				req.session.token = token
				res.redirect('/home')
			});     
		} 
		catch (error) {
			return next(error);
		}
	})(req, res, next);
});

//Middleware Protection
function verifyAuth(req, res, next){
	if(req.isAuthenticated()) next()
	else res.redirect("/login")
}

//Post Login
router.post('/Login', (req, res)=>{
	Users.list()
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

router.post('/signup', function(req, res) {
var user = {
  name: req.body.name,
  username: req.body.username,
  password: req.body.password,
  email:  req.body.email,
  age:  req.body.age,
  gender: req.body.gender,
  address:{
    country:req.body.country,
    city: req.body.city  
  }
}

  axios.post('http://localhost:3000/api/users/signup', user)
  .then(() => res.redirect('http://localhost:3000/'))
  .catch(erro => {
    console.log('Erro na inserção da bd')
    //res.redirect('http://localhost:3000/')
  })
  
});

module.exports = router;
