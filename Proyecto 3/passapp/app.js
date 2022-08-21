var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var crypto = require('crypto');

var cors = require('cors');
const Sequelize = require('sequelize');
const sesionesusuarios = require('./models/sesionesusuarios');
const usuario = require('./models').usuario;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(cors())

let sessionsList = [];

app.post('/login/validate', function (req, res, next) {
  let user = req.body.username;  
  let pass = req.body.password;
  let userid;
 
  let jsonResponse = {};
  let hash;

  usuario.findOne({ where: { username: user } }) 
    .then((user) => {  
        if(user == null){
          jsonResponse = {userid: null, valid: false, tipo: "unregistered", sessionHash: null};
        }else{
          userid = user.id.toString();
          if(user.password == pass){
            let toHash = user.id.toString() + user.password.toString + new Date().toLocaleString();
            hash = crypto.createHash('sha1').update(toHash).digest('hex');
            sessionsList.push({id: userid, hash: hash});
            if(user.tipoUsuario == 1){
              jsonResponse = {userid: user.id, valid: true, tipo: "admin", sessionHash: hash};
            }else if(user.tipoUsuario == 2){
              jsonResponse = {userid: user.id, valid: true, tipo: "common", sessionHash: hash};
            }
          }else{
            jsonResponse = {userid: null, valid: false, tipo: null, sessionHash: null};
          }
        }
    }).then(()=>{
      res.json(jsonResponse);
    })
    .catch(error => res.json({error:"error"}));
})

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

app.post('/session/logout', function(req, res, next) {
  let id = req.body.userID;  
  let hash = req.body.sessionHash;
  let is_valid = false;
  for(let i = 0; i < sessionsList.length; i++){
    if(sessionsList[i].id == id.toString() && sessionsList[i].hash == hash){
      is_valid = true;
      sessionsList.splice(i, 1);
      break;
    }
  }
  res.json({valid: is_valid});
});

app.get('/user/:u', function(req, res, next) {
  let username = (req.params.u);
  usuario.findAll({  
    attributes: { exclude: ["updatedAt"] }
  }).then(usu =>{
      res.json(usu);
  });
});

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
