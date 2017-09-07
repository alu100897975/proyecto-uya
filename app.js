'use strict'
var express = require('express'),
    bodyParser = require('body-parser'),
    // sass = require('node-sass-middleware'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    app = express(),
    port = process.env.PORT || 8080,
    server = require('http').Server(app),
    io = require('socket.io')(server),

    passport = require('./config/passport');

mongoose.connect('localhost:27017/clasdy');


app.use('/public',express.static(__dirname + '/public')); //Poner arriba para evitar serializacion en cada peticion
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


app.use(cookieParser());
app.use(session({secret: '1234abcd',resave: true,saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: true})); //form params in req.body
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT DELETE');
    res.header('Allow', 'GET, POST, PUT DELETE');
    next();
})
// app.use((req,res,next)=>{
//     console.log("parametros pasados");
//     console.log(req.body);
//     next();
// })

app.use(function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()) {
        console.log("Autenticado");

    }
	// if they aren't redirect them to the home page
	return next();
});
function isUnauthenticated(req,res,next){
    if(req.isAuthenticated())
        return res.redirect('/')
    next();
};
function isAuthenticated(req,res,next){
    if(req.isAuthenticated())
        return next();
    return res.redirect('/')
}

// Rutas para usuarios no autenticados
app.use('/join',isUnauthenticated, require('./routes/auth')); //Rutas de acceso
app.use('/events', require('./routes/event'));

// Rutas para usuarios autenticados
app.get('/logout',isAuthenticated, (req,res)=>{
    console.log("Cerrar sesión");
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});
app.get('/', (req,res)=>{
    if(req.isAuthenticated()){
        res.render('home');
        return;
    }
    res.render('index');
});

app.get('/chat', (req, res)=>{
  // if(req.isAuthenticated())
    res.render('chat');
  //res.render('index');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat',
    nickname: 'Bot'
}]; //Array de mensajes.

io.on('connection', function(socket){
    console.log("El equipo con IP "+socket.handshake.address+" se ha conectado.");

    socket.emit('messages', messages);
    //console.log(messages);

    socket.on('add-message', function(data){
      messages.push(data);

      io.sockets.emit('messages', messages);
    })
});

app.use(function(req, res, next) {
  res.status(404).render('error', {code: 404, message: 'No encontrado'});
});
server.listen(port, (err)=>{
    if(err){
        console.log('error:',err);
        return;
    }
    console.log('Servidor corriendo en el puerto '+port);
})
