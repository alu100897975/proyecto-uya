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

module.exports = router
