var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors = require('cors');
const Sequelize = require('sequelize');
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

app.post('/login/validate', function (req, res, next) {
  let user = req.body.username;  
  let pass = req.body.password;  
    
  console.log("usuario: ", user);
  console.log("contraseña: ", pass);
  //res.json({user: user, pass: pass});

  usuario.findOne({ where: { username: user } }) 
  .then(user => {  
      if(user == null){
        res.json({userid: null, valid: false, tipo: "unregistered"});
      }else{
        if(user.password == pass){
          if(user.tipoUsuario == 1){
            res.json({userid: user.id, valid: true, tipo: "admin"});
          }else if(user.tipoUsuario == 2){
            res.json({userid: user.id, valid: true, tipo: "common"});
          }
        }else{
          res.json({userid: null, valid: false, tipo: null});
        }
      }
  })
  .catch(error => res.json(error)) 

})

app.get('/user/:u', function(req, res, next) {
  let username = (req.params.u);
  usuario.findAll({  
    attributes: { exclude: ["updatedAt"] }  
}) 
  .then(usu =>{
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
