var express = require('express');
var router = express.Router();
const usuario = require('../models').usuario;
var crypto = require('crypto');
const session = require('express-session');
const cors = require('cors');

let bd = {
  'usuario': 'abc',
  'contrasenia': '123'
}

let corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:3000']
};

/* GET users listing. 
router.post('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});*/

router.post('/', cors(corsOptions), function (req, res, next) {
  console.log("usuario: ", req.body.user)
  console.log("contraseña: ", req.body.password)
  let loginResponse;
  usuario.findOne({ where: { username: req.body.user } })
    .then((user) => {
      if (user == null) {
        loginResponse = { isValidCredentials: false, message: "Usuario no registrado", session: mull };
      } else {
        if (user.password == req.body.password) {
          if (user.tipoUsuario == 1) {
            req.session.admin = true;
            req.session.user = req.body.user;
            loginResponse = { isValidCredentials: true, message: "", session: req.session };
          } else if (user.tipoUsuario == 2) {
            req.session.admin = false;
            req.session.user = req.body.user;
            loginResponse = { isValidCredentials: true, message: "", session: req.session };
          }
          console.log(req.session.cookie);
        } else {
          loginResponse = { isValidCredentials: false, message: "El usuario y la contraseña no coinciden", session: null };
        }
      }
      console.log("REQ SESSION admin?: ", req.session.admin);
      console.log("REQ SESSION user: ", req.session.user);
      res.json(loginResponse);
    })
    .catch(error => res.json({ error: "error" }));

});

router.post('/session', function (req, res, next) {
  //console.log("my session from session: ", req.session, req.headers);
  console.log(req.session.user);
  usuario.findOne({ where: { username: req.session.user } })
    .then((user) => {
      if (user == null) {
        jsonResponse = { userid: null, valid: false, tipo: "unregistered", sessionHash: null };
      } else {
        console.log(req.session && req.session.user === user.username);
        if (req.session && req.session.user === user.username) {
          console.log('req true');
          res.json({ isValidSession: true });
        } else {
          console.log('req false');
          res.json({ isValidSession: false });
        }
      }
    })
    .catch(error => { console.log("catch"); res.sendStatus(404) });
})

router.post('/out', function (req, res, next) {
  req.session.destroy();
  res.json({ out: true });
})

module.exports = router;
