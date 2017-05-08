'use strict'
var express = require('express'),
    bodyParser = require('body-parser'),
    sass = require('node-sass-middleware'),
    mongoose = require('mongoose'),
    app = express(),
    port = process.env.PORT || 8080,

    user = require('./routes/users');

mongoose.connect('localhost:27017/clasdy')


app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(sass({
    src: __dirname + '/development',
    dest: __dirname + '/public'/*,
    debug: true*/
}));
app.use(bodyParser.urlencoded({extended: true})); //form params in req.body
app.use(express.static('public'));


app.use('/user',user);


app.get('/', (req,res)=>{
    res.render('index');
});
app.get('/signup', (req,res)=>{
    res.render('signup');
});
app.get('/signin', (req,res)=>{
    res.render('signin');
})

app.listen(port, (err)=>{
    if(err){
        console.log('error:',err);
        return;
    }
    console.log('Servidor corriendo en el puerto '+port);
})
