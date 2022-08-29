var express = require('express');
var router = express.Router();
const usuario = require('../models').usuario;
const servicio = require('../models').servicio;

/* GET users listing. */
router.get('/summary', function (req, res, next) {
    console.log("SUMMARY");
    console.log(req.session.user);
    usuario.findOne({ where: { username: req.session.user } })
        .then((user) => {
            res.json(user);
        })
        .catch(error => { console.log('catch'); res.sendStatus(401) });

});

router.get('/services', function (req, res, next) {
    servicio.findAll()  
    .then(servicios => {  
        console.log('SERVICIOS ENCONTRADOS',servicios);
        res.json(servicios); 
    })  
    .catch(error => res.status(400).send(error))
});

router.get('/icons/:image', function (req, res, next) {
    let imageName = req.params.image;
    let filename = '/' + imageName + '.png';
    res.sendFile(filename, { root: '\public\\images' });
});



router.get('/keychain', function (req, res, next) {
    let user = req.params.user;
    servicio.findAll()  
    .then(servicios => {  
        console.log('SERVICIOS ENCONTRADOS',servicios);
        res.json(servicios); 
    })  
    .catch(error => res.status(400).send(error))
});



module.exports = router;
