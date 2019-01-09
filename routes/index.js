var express = require('express');
var router = express.Router();
var axios = require('axios')
var fs = require('fs')
var formidable = require('formidable')
var moment = require('moment');
var FB = require('fb');
var passportFacebook = require('../auth/facebook');

/* FACEBOOK ROUTER */
router.get('/facebook',
  passportFacebook.authenticate('facebook', { scope : ['email'] }));

router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

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
      res.render('home', { posts: resposta.data, username:req.user._id, utilizador:req.user })
    })
    .catch(erro => {
      console.log('Erro ao carregar da bd')
      res.render('error', { error: erro, message: 'Erro ao carregar da bd' })
    })

});

/* Profile page.*/
router.get('/profile/:id', verifyAuth, function (req, res) {
  axios.get('http://localhost:3000/api/posts/user/'+req.params.id)
    .then(resposta => {  
      res.render('profile', { posts: resposta.data, username:req.user._id, utilizador:req.user })
    })
    .catch(erro => {
      console.log('Erro ao carregar da bd')
      res.render('error', { error: erro, message: 'Erro ao carregar da bd' })
    })

});

/* Event page */
router.get('/events', verifyAuth, function (req, res) {
  axios.get('http://localhost:3000/api/events/')
    .then(resposta => {  
      res.render('events', { events: resposta.data, utilizador:req.user })
    })
    .catch(erro => {
      console.log('Erro ao carregar da bd')
      res.render('error', { error: erro, message: 'Erro ao carregar da bd' })
    })

});

//Insert new Event

router.post('/events', verifyAuth, function (req, res) {
  console.log("Chego")
  var event;
  var form = new formidable.IncomingForm()
  form.parse(req, (erro, fields, files) => {
    if (!files.inputImage.name) {
      event = {
        date: fields.inputDate,
        local: fields.inputLocation,
        title : fields.inputTitle,
        description : fields.inputDescription,
      } 
      axios.post('http://localhost:3000/api/events/', event)
        .then(() => res.redirect('http://localhost:3000/'))
        .catch(erro => {
          console.log('Erro na inserção da bd')
          //res.redirect('http://localhost:3000/')
        })
    } else {
      var fenviado = files.inputImage.path
      var fnovo = '../Schmocial/public/images/eventos/' + files.inputImage.name
      fs.rename(fenviado, fnovo, erro => {
        if (!erro) {
          event = {
          date: fields.inputDate,
          local: fields.inputLocation,
          title : fields.inputTitle,
          description : fields.inputDescription,
          picture : files.inputImage.name,
          }
          axios.post('http://localhost:3000/api/events/', event)
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

//Connects Routes
router.get('/friends', verifyAuth, function (req, res) { 
  res.render('connections', { username_id:req.user._id, username_name:req.user.name })
});

//Friends Profile
router.get('/friends/:id', verifyAuth, function (req, res) {
  axios.get('http://localhost:3000/api/posts/user/'+req.params.id)
    .then(resposta => {  
      res.render('friend', { posts: resposta.data, username:req.params.id.split(":")[1] })
    })
    .catch(erro => {
      console.log('Erro ao carregar da bd')
      res.render('error', { error: erro, message: 'Erro ao carregar da bd' })
    })

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
        owner: req.user._id+":"+req.user.name,
        title: "teste",
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
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
            owner: req.user._id+":"+req.user.name,
            title: "teste",
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
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

//Insere comentario
router.post('/posts/comment/', verifyAuth, function (req, res) {
  var comment
  if(req.user.picture){
    comment = {
      message:req.body.comment,
      user:req.user._id+":"+req.user.name,
      date:moment().format("YYYY-MM-DD HH:mm:ss"), 
      picture:req.user.picture
    } 
  }else{
    comment = {
      message:req.body.comment,
      user:req.user._id+":"+req.user.name,
      date:moment().format("YYYY-MM-DD HH:mm:ss")
    } 
  }
  axios.post('http://localhost:3000/api/posts/comment/'+req.body.id, comment)
    .then(resposta => {
      console.log(resposta.data) 
    })
    .catch(erro => {
      console.log('Erro ao carregar da bd asdasd'+erro) 
    })

});

//Insere voto
router.post('/posts/vote/', verifyAuth, function (req, res) { 
  axios.post('http://localhost:3000/api/posts/vote/',req.body)
    .then(resposta => {
      console.log(resposta.data) 
    })
    .catch(erro => {
      console.log('Erro ao carregar da bd asdasd'+erro) 
    })

});

//Postar no face
router.get('/facebook/post', verifyAuth, function (req, res) {
  
  var url = 'https://graph.facebook.com/'+req.user.facebook.id+'/feed';
  console.log("URL"+url)

  FB.setAccessToken(req.user.facebook.token);

  var body = 'My first post using facebook-node-sdk';
  FB.api('me/feed', 'post', { message: body}, function (res) {
    if(!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      return;
    }
    console.log('Post Id: ' + res.id);
  });

/*
  var params = {
   access_token: req.user.facebook.token,
   message: "hi" 
  }

  axios.post(url,params)
    .then(resposta => {
      console.log(resposta.data) 
    })
    .catch(erro => {
      console.log('Erro ao carregar da bd asdasd'+erro) 
    })*/


});

module.exports = router;
