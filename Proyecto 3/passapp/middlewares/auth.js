var express = require('express');
const usuario = require('../models').usuario;
var router = express.Router();
var cors = require('cors');


var auth = (req, res, next) => {
    console.log("\n\n\nmy session from auth", req.session);

    usuario.findOne({ where: { username: req.session.user } })
        .then((user) => {
          if (user == null) {
            res.sendStatus(401);
          } else {
            if (req.session && req.session.user === user.username) {
              console.log('Authorized: true');
              next();
            } else {
              console.log('Authorized: false');
              res.sendStatus(401)
            }
          }
        })
        .catch(error => { console.log(error); res.json(error) });
};

module.exports = auth;