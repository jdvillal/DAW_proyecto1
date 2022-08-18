var express = require('express');
var router = express.Router();

let bd = {
  'usuario': 'abc',
  'contrasenia': '123'
}

/* GET users listing. 
router.get('/', function(req, res, next) {
  //res.render('login', { title: 'Login' });
});*/

router.post('/validate', function(req, res, next) {  
  let user = req.body.user;  
  let contrasenia = req.body.password;  
    
  console.log("usuario: ", usuario)  
  console.log("contraseña: ", contrasenia)  
  usuario.findOne({ where:{ username: user, password: contrasenia}
    })  
    .then(usuario => {
        //Validación   
        if(usuario != null){
            res.json('{"auth": true}');
        }else{
            res.json('{"auth": false}');
        }
    })  
    .catch(error => res.status(400).send(error)) 
    })
  


module.exports = router;