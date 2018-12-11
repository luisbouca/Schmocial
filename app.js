var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//Database Connection
var mongose = require('mongoose')
mongose.connect('mongodb://127.0.0.1:27017/schmocial',{useNewUrlParser: true}).then(()=>{
    console.log('Mongo Ready: '+mongose.connection.readyState)
}).catch(e=>{
    console.log('Mongo: Error in connection.')
})



var app = express();


//Auth
var passport = require('passport')
require('./auth/auth')
app.use(passport.initialize())
app.use(passport.session())

//session
var uuid = require('uuid/v4')
var session = require('express-session')
var FileStore = require('session-file-store')(session)
app.use(session({
  genid: () => {
    return uuid()},
  store: new FileStore(),
  secret: 'dweb2018',
  resave: false,
  saveUninitialized: true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Routes
var apiRouter = require('./routes/api');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
