var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var session = require('express-session');
var loginRouter = require('./routes/login');
var apiRouter = require('./routes/api');
var auth = require('./middlewares/auth');

var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({origin: true,credentials: true}));

app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 600000, /*httpOnly: false*/}
}));

app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/', auth, indexRouter);
app.use('/api', apiRouter);

app.post('/session/validate', function(req, res, next) {
  let id = req.body.userID;  
  let hash = req.body.sessionHash;
  let is_valid = false;

  for(let i = 0; i < sessionsList.length; i++){
    if(sessionsList[i].id == id.toString() && sessionsList[i].hash == hash){
      is_valid = true;
      break;
    }
  }
  res.json({valid: is_valid});
});

/*
app.get('/user/:u', function(req, res, next) {
  let username = (req.params.u);
  usuario.findAll({  
    attributes: { exclude: ["updatedAt"] }
  }).then(usu =>{
      res.json(usu);
  });
});*/

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
