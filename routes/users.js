var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

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
