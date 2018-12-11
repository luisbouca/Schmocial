var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//Get Login Page
router.get('/Login', (req, res)=>{
	Users.list()
	.then(dados => res.jsonp(dados))
	.catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//Post Login
router.post('/login', async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {     
		try {
			if(err || !user){
				if(err){
					return next(err);
				}else{
					return next(new Error(info.message))
				} 
			}
			req.login(user, { session : false }, async (error) => {
				if( error ) return next(error)
				var myuser = { _id : user._id, email : user.email };
				// Geração do token
				var token = jwt.sign({ user : myuser },'dweb2018');
				req.session.token = token
				res.redirect('/api/users/' + user.email)
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

module.exports = router;
