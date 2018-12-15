var express = require('express');
var router = express.Router();
var Users = require('../controllers/users')
var Events = require('../controllers/events')
var Posts = require('../controllers/posts')
var passport = require('passport')
var jwt = require('jsonwebtoken')

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


//POSTS API ROUTES

//get all posts
router.get('/posts', (req, res)=>{
    Posts.list()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//get posts by tittle
router.get('/posts/:tittle', (req, res)=>{
    Posts.getByTitle(req.params.tittle)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//get post comment
router.get('/posts/comments/:id', (req, res)=>{
    Posts.listComments(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).send('DEU ERRO NA LISTAGEMMMMM'))
})

//insert new Post
router.post('/posts', (req, res)=>{
    console.log(req.body)
    Posts.insertNew(req.body)
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




module.exports = router;