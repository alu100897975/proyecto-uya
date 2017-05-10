'use strict'
var express = require('express'),
    bodyParser = require('body-parser'),
    sass = require('node-sass-middleware'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    app = express(),
    port = process.env.PORT || 8080,

    passport = require('./config/passport');



mongoose.connect('localhost:27017/clasdy')

app.use('/public',express.static(__dirname + '/public')); //Poner arriba para evitar serializacion en cada peticion
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(sass({
    src: __dirname + '/development',
    dest: __dirname + '/public'
}));


app.use(cookieParser());
app.use(session({secret: '1234abcd',resave: true,saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: true})); //form params in req.body




app.use('/join', require('./routes/auth')); //Rutas de acceso

app.get('/', (req,res)=>{
    res.render('index');
});
app.get('/home', (req,res) =>{
    res.render('home');
})

app.use(function(req, res, next) {
  res.status(404).render('error', {code: 404, message: 'No encontrado'});
});
app.listen(port, (err)=>{
    if(err){
        console.log('error:',err);
        return;
    }
    console.log('Servidor corriendo en el puerto '+port);
})
