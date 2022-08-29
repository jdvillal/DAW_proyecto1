var express = require('express');
var router = express.Router();
var path = require("path");
const usuario = require('../models').usuario;
var crypto = require('crypto');
const session = require('express-session');
const cors = require('cors');

const servicio = require('../models').servicio;

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
        } else {
          loginResponse = { isValidCredentials: false, message: "El usuario y la contraseña no coinciden", session: null };
        }
      }
      res.json(loginResponse);
    })
    .catch(error => res.json({ error: "error" }));

});


router.post('/session', function (req, res, next) {
  //console.log("my session from session: ", req.session, req.headers);
  console.log(req.session);
  usuario.findOne({ where: { username: req.session.user } })
    .then((user) => {
      if (user == null) {
        jsonResponse = { userid: null, valid: false, tipo: "unregistered", sessionHash: null };
      } else {
        if (req.session && req.session.user === user.username) {
          res.json({ isValidSession: true });
        } else {
          res.json({ isValidSession: false });
        }
      }
    })
    .catch(error => { console.log("catch session"); res.sendStatus(404) });
})

router.post('/out', function (req, res, next) {
  req.session.destroy();
  res.json({ out: true });
})

module.exports = router;
