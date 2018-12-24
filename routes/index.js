var express = require('express');
var router = express.Router();
var axios = require('axios')
var fs = require('fs')
var formidable = require('formidable')

/* Home page. */
router.get('/', function (req, res) {

  if (req.isAuthenticated()) {
    res.redirect('/home')
  } else {
    res.render('index', { title: 'Welcome to Schmocial' });
  }
});

//Middleware Protection
function verifyAuth(req, res, next) {
  if (req.isAuthenticated()) next()
  else res.redirect("/signin")
}

/* Login page.*/
router.get('/signin', function (req, res) {
  res.render('login', { title: 'Welcome to Schmocial' });
});

/* Home page.*/
router.get('/home', verifyAuth, function (req, res) {
  axios.get('http://localhost:3000/api/posts')
    .then(resposta => {  
      res.render('home', { posts: resposta.data, username:req.user._id })
    })
    .catch(erro => {
      console.log('Erro ao carregar da bd')
      res.render('error', { error: erro, message: 'Erro ao carregar da bd' })
    })

});

//Connects Routes
router.get('/friends', verifyAuth, function (req, res) { 
  res.render('connections', { username_id:req.user._id, username_name:req.user.name })
});

//Request friendship
router.post('/friends/new', verifyAuth, function (req, res) {
 
  console.log("OPEE"+req.body)
  axios.get('http://localhost:3000/api/friends/new/')
    .then(resposta => {
      res.render('home', { posts: resposta.data })
    })
    .catch(erro => {
      console.log('Erro ao carregar da bd asdasd'+erro) 
    })

});


//Post routs

//Get hashtags
router.get('/posts/hashtags', verifyAuth, function (req, res) {
 
  axios.get('http://localhost:3000/api/posts/hashtags')
    .then(resposta => {
      res.render('hashtags', {lista:resposta.data})
    })
    .catch(erro => {
      console.log('Erro ao carregar da bd asdasd'+erro) 
    })

});

//Get posts filtered // Esta route acho que nao esta a ser usada xD
router.post('/posts/filter', verifyAuth, function (req, res) {
 
  console.log("OPEE"+req.body)
  axios.get('http://localhost:3000/api/posts/filter/'+req.body.hashtags)
    .then(resposta => {
      res.render('home', { posts: resposta.data })
    })
    .catch(erro => {
      console.log('Erro ao carregar da bd asdasd'+erro) 
    })

});

router.post('/insertPost', verifyAuth, function (req, res) {

  var poste;
  var hashtags = new Array()
  var form = new formidable.IncomingForm()
  form
  .on('field', function(field, value) {
    if(field=='hashtags[]' && value!=""){
      console.log("hashtag"+value)
      hashtags.push(value)
    }
  })
  .on('end', function() { 
  console.log(hashtags)
  });
  
  form.parse(req, (erro, fields, files) => {
    if (!files.ficheiro.name) {
      poste = {
        owner: req.user._id,
        title: "teste",
        date: Date.now(),
        content: fields.descricao,
        state: fields.state,
        hashtags:hashtags
      }
      console.log(poste)
      axios.post('http://localhost:3000/api/posts', poste)
        .then(() => res.redirect('http://localhost:3000/'))
        .catch(erro => {
          console.log('Erro na inserção da bd')
          //res.redirect('http://localhost:3000/')
        })
    } else {
      var fenviado = files.ficheiro.path
      var fnovo = '../Schmocial/public/images/' + files.ficheiro.name
      fs.rename(fenviado, fnovo, erro => {
        if (!erro) {
          poste = {
            owner: req.user._id,
            title: "teste",
            date: Date.now(),
            content: fields.descricao,
            picture: files.ficheiro.name,
            file: fnovo,
            state: fields.state,
            hashtags:hashtags
          }
          axios.post('http://localhost:3000/api/posts', poste)
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


router.post('/posts/comment/', verifyAuth, function (req, res) {
  var comment = {
    message:req.body.comment,
    user:req.user._id+":"+req.user.name,
    date:Date.now()
  } 
  axios.post('http://localhost:3000/api/posts/comment/'+req.body.id, comment)
    .then(resposta => {
      console.log(resposta.data) 
    })
    .catch(erro => {
      console.log('Erro ao carregar da bd asdasd'+erro) 
    })

});

router.post('/posts/vote/', verifyAuth, function (req, res) { 
  axios.post('http://localhost:3000/api/posts/vote/',req.body)
    .then(resposta => {
      console.log(resposta.data) 
    })
    .catch(erro => {
      console.log('Erro ao carregar da bd asdasd'+erro) 
    })

});

module.exports = router;
