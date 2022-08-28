var express = require('express');
const usuario = require('../models').usuario;
var router = express.Router();
var cors = require('cors');


var auth = (req, res, next) => {
    console.log("my session from auth", req.session);
    usuario.findOne({ where: { username: req.session.user } })
        .then((user) => {
            if (user == null) {
                console.log('User null');
                res.sendStatus(401);
            } else {
                console.log('auth called');
                if (req.session && req.session.user === user.username /*&& req.session.admin*/) {
                    console.log('NEXT');
                    next();
                } else {
                    console.log("else");
                    res.sendStatus(401);
                }
            }
        })
        .catch(error => { console.log('catch'); res.sendStatus(401) });
};

module.exports = auth;