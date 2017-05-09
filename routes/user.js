'use strict'
var express = require('express'),
    bcrypt = require('bcryptjs'),

    User = require('../models/user'),

    router = express.Router();

router.post('/', (req, res, next)=>{
    console.log(req.body);
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    user.save().then((result)=>{
        res.send('Usuario guardado');
    }).catch((reason)=>{
        console.log('error', reason);
        res.send('hubo un error');
    });
});
router.post('/signin', (req, res, next )=>{
    User.findOne({email:req.body.email}, (err, user)=>{
        if(err){
            res.send('Hubo un error al buscar el usuario');
        }
        if(!user){
            res.send('No se encontro ningun isuario');
        }
        if (!bcrypt.compareSync(req.body.password, user.password) ){
            res.send('Contraseña errónea');
        }
        res.redirect('/home');
    });
})
module.exports = router
