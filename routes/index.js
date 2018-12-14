var express = require('express');
var router = express.Router();
var axios = require('axios')
var fs = require('fs')
var formidable = require('formidable') 

/* Home page. */
router.get('/', function(req, res) {

  if(req.isAuthenticated()){
    res.redirect('/home')
  }else{
    res.render('index', { title: 'Welcome to Schmocial' });
  }
});

//Middleware Protection
function verifyAuth(req, res, next){
	if(req.isAuthenticated()) next()
	else res.redirect("/signin")
}

/* Login page.*/
router.get('/signin', function(req, res) {
  res.render('login', { title: 'Welcome to Schmocial' });
});

/* Login page.*/
router.get('/home',verifyAuth, function(req, res) {
  res.render('home', { title: 'Welcome to Schmocial User' });
});


//Post routs

router.post('/insertPost',verifyAuth, function(req, res) {
  var form = new formidable.IncomingForm()
  form.parse(req, (erro, fields, files) => {
      var fenviado = files.ficheiro.path
      var fnovo = '../Schmocial/public/images/' + files.ficheiro.name  
      fs.rename(fenviado, fnovo, erro => {
          if (!erro) {
            var post = {
              owner:req.user._id,
              title: "teste",
              date: Date.now(),
              content:fields.descricao,
              picture:fnovo,
              state:"privte"
            } 
            console.dir(post)
  axios.post('http://localhost:3000/api/posts', post)
  .then(() => res.redirect('http://localhost:3000/'))
  .catch(erro => {
    console.log('Erro na inserção da bd')
    //res.redirect('http://localhost:3000/')
  })

          }else{ 
              //res.render(error)
              console.log("ERRO +"+erro)
          }
      })
  })


/*

  var post = {
    owner:req.user._id,
    title: "teste",
    date: Date.now(),
    content:req.body.descricao,
    picture:req.body.ficheiro 
  }
  
  axios.post('http://localhost:3000/api/posts', post)
.then(() => res.redirect('http://localhost:3000/'))
.catch(erro => {
  console.log('Erro na inserção da bd')
  //res.redirect('http://localhost:3000/')
})*/
});


module.exports = router;
