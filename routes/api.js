var express = require('express');
var router = express.Router();
var Users = require('../controllers/users')
var Events = require('../controllers/events')
var Posts = require('../controllers/posts')
var Messages = require('../controllers/messages')
var passport = require('passport')
var jwt = require('jsonwebtoken')
var csv = require('csv-express');
var Post = require('../models/post')
var fs = require('fs')
var async = require('async');

/* Export Data. */
router.get('/export', async function(req, res, next) {
    let data
    //guarda toda a informação das coleções na variavel data
   try {
      data = await Promise.all([
         Posts.export(),
         Events.export(),
         Messages.export(),
         Users.export()
      ]);
   //data[0] = Posts.list result, data[1] = Events.list result etc..
   res.status(200).json(data)
   } catch (e) {
    res.status(500).send('error');  
   }
  });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//USER API ROUTES

//Get all users
router.get('/users', (req, res)=>{
    Users.list()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})
//Get user by name
router.get('/users/:id', (req, res)=>{
    Users.getById(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})
//Get user by name
router.get('/users/name/:name', (req, res)=>{
    Users.getByName(req.params.name)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})
//Insert User
router.post('/users/signup', (req, res)=>{
    Users.insertNew(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA INSERÇAO'))
})




//EVENT API ROUTES

//get all events
router.get('/events', (req, res)=>{
    Events.list()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//get all events after today date
router.get('/events/byDate', (req, res)=>{
    Events.getByDate()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//get events by name
router.get('/events/:name', (req, res)=>{
    Events.getByTitle(req.params.name)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//insert new Event
router.post('/events', (req, res)=>{ 
    Events.insertNew(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//insert participant in Event
router.post('/events/participant', (req, res)=>{ 
    Events.insertNewParticipant(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//remove participant in Event
router.post('/events/participant/remove', (req, res)=>{
    Events.removeParticipant(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//gets participants from Event
router.get('/events/participants/:id', (req, res)=>{ 
    Events.getParticipants(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})


//POSTS API ROUTES

//get all posts
router.get('/posts', (req, res)=>{
    console.log("Chegueii POST")
    Posts.list()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//get all hashtags
router.get('/posts/hashtags', (req, res)=>{ 
    Posts.listHashtags()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//get posts by tittle
router.get('/posts/:tittle', (req, res)=>{
    Posts.getByTitle(req.params.tittle)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//get user posts
router.get('/posts/user/:id', (req, res)=>{
    Posts.getByUser(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})
//get post comment
router.get('/posts/comments/:id', (req, res)=>{
    console.log("COMENTARIO")
    Posts.listComments(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//update status post
router.post('/posts/update/', (req, res)=>{
    Posts.updatePost(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//remove post by id
router.post('/posts/remove/', (req, res)=>{
    Posts.removePost(req.body.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})


//insert new Post
router.post('/posts', (req, res)=>{
    console.log("API "+req.body.hashtags)
    Posts.insertNew(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})
//Remove comment on Post
router.post('/posts/comment/remove', (req, res)=>{ 
    Posts.removeComment(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//insert new comment on Post
router.post('/posts/comment/:id', (req, res)=>{
    console.log("Recebi pedido comentario+"+req.body.comment) 
    Posts.insertNewComent(req.params.id,req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//Filter by hashtags
router.post('/posts/filter/', (req, res)=>{
    console.log("Recebi pedido comentario+"+req.body.hashtags) 
    Posts.listByHashtags(req.body.hashtags)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//Add new vote
router.post('/posts/vote/', (req, res)=>{ 
    Posts.insertNewVote(req.body.user, req.body.post)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//Remove vote
router.post('/posts/vote/remove', (req, res)=>{ 
    console.log("dasfaaa"+req.body.user)
    Posts.removeVote(req.body.user, req.body.post)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//New Friend Request
router.post('/friends/new/', (req, res)=>{ 
    Users.insertNewFriend(req.body)
    .then(dados => res.jsonp(dados))
})

//Accept friend
router.post('/friends/accept/', (req, res)=>{ 
    Users.acceptFriend(req.body)
    .then(dados => res.jsonp(dados))
})

//Delete friend
router.post('/friends/delete/', (req, res)=>{ 
    Users.deleteFriend(req.body)
    .then(dados => res.jsonp(dados))
})

//Get Friends
router.get('/friends/get/:id', (req, res)=>{ 
    Users.getFriends(req.params.id)
    .then(dados => res.jsonp(dados))
})

//Get User Friends
router.get('/friends/get/user/:id', (req, res)=>{ 
    Users.getUserFriends(req.params.id)
    .then(dados => res.jsonp(dados))
})

//Create new messages beetween users
router.post('/messages/', (req, res)=>{ 
   var mensagens = {
        nome: req.body.nome,
        foto: req.body.foto,
        texto:req.body.mensagem
    }
    var mensagem = {
        idUser1:req.body.idUser1,
        idUser2:req.body.idUser2, 
        mensagens:mensagens
    }
    Messages.insertNew(mensagem)
    .then(dados => res.jsonp(dados))

})

//Update messages beetween users
router.post('/messages/update', (req, res)=>{ 
    var mensagens = {
         nome: req.body.nome,
         foto: req.body.foto,
         texto:req.body.mensagem
     }
     var mensagem = {
         idUser1:req.body.idUser1,
         idUser2:req.body.idUser2, 
         mensagens:mensagens
     } 
     Messages.addMessages(mensagem)
     .then(dados => res.jsonp(dados))
 
 })


//Get messages beetween users
router.get('/messages/:id/:id2', (req, res)=>{ 
    Messages.listBetweenUsers(req.params.id,req.params.id2)
    .then(dados => res.jsonp(dados))

})

module.exports = router;