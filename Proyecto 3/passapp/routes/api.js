var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:user/data', function(req, res, next) {
    res.json({get: true});
});

router.get('/:user/llavero', function(req, res, next) {
    res.json({get: true});
});

router.get('/:user/', function(req, res, next) {
    res.json({get: true});
});



module.exports = router;
