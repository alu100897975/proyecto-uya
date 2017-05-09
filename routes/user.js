'use strict'
var express = require('express'),
    router = express.Router(),

    User = require('../models/user');

router.post('/', (req, res, next)=>{
    console.log(req.body);
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save((err, result)=>{
        if(err) res.send('Ha ocurrido un error al guardar el usuario');
        else res.send('Usuario guardado');
    })
});

module.exports = router
