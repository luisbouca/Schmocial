var express = require('express');
var router = express.Router();
var passport = require('passport')
var axios = require('axios')
var jwt = require('jsonwebtoken')
var fs = require('fs')
var formidable = require('formidable')

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

//Logout
router.get('/logout', (req, res)=>{
	req.session.destroy(function (err) {
		res.redirect('/'); //Inside a callback… bulletproof!
	  });
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
			req.login(user, async (error) => {
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
var user
var form = new formidable.IncomingForm()
  form.parse(req, (erro, fields, files) => {
    if (!files.profilePic.name) {
      user = {
        name: fields.name,
        username: fields.username,
        password : fields.password,
        email : fields.email,
        age: fields.age,
				gender: fields.gender,
				address:{
					country:fields.country,
					city: fields.city  
				}
      } 
      axios.post('http://localhost:3000/api/users/signup', user)
  .then(() => res.redirect('http://localhost:3000/'))
  .catch(erro => {
    console.log('Erro na inserção da bd')
    //res.redirect('http://localhost:3000/')
  })
    } else {
      var fenviado = files.profilePic.path
      var fnovo = '../Schmocial/public/images/profile/' + files.profilePic.name
      fs.rename(fenviado, fnovo, erro => {
        if (!erro) {
          user = {
						name: fields.name,
						username: fields.username,
						password : fields.password,
						email : fields.email,
						age: fields.age,
						gender: fields.gender,
						address:{
							country:fields.country,
							city: fields.city  
						},
						picture:files.profilePic.name
					}
          axios.post('http://localhost:3000/api/users/signup', user)
  .then(() => res.redirect('http://localhost:3000/'))
  .catch(erro => {
    console.log('Erro na inserção da bd')
    //res.redirect('http://localhost:3000/')
  })
        } else {
          //res.render(error)
          console.log("ERRO +" + erro)
        }
      })
    }
  })  
  
});

module.exports = router;
