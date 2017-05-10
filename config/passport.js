'use strict'
var passport = require('passport'),

    //Passport strategies
    GoogleStrategy = require('passport-google-oauth2').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,

    //User model
    User = require('../models/user'),

    //Claves auth
    auth = require('./auth');

passport.serializeUser( (user, done)=>{
    console.log('serialize:',user);
    done(null, user.id);
});

// se ejecuta en cada peticion despues de iniciar sesión
passport.deserializeUser( (id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    });
});

passport.use('local-login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, (req, email, password, done)=>{
        User.findOne({email: email}, (err, user)=>{

            if (err) return done(err);
            if (!user) return done(null,false);
            if (!user.verifyPassword(password)) return done(null, false);
            done(null,user);
        });
    }
))
passport.use('local-signup',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, (req, email, password, done)=>{
        User.findOne({email: email}, (err, user)=>{
            if (err) return done(err);
            if (user) return done(null, false); //El usuario ya existe
            var user = new User({
                name: req.body.name,
                email: email,
                password: User.hashPassword(password)
            })
            user.save().then((result)=>{
                done(null, user);
            }).catch((err)=>{
                throw err;
            });
        });
    })
);


passport.use(
    new GoogleStrategy({
        clientID: auth.googleAuth.clientID,
        clientSecret: auth.googleAuth.clientSecret,
        callbackURL: auth.googleAuth.callbackURL
    }, (token, refreshToken, profile, done)=> {

        process.nextTick(function(){
            User.findOne({ googleId: profile.id}, (err, user)=>{
                if(err) return done(err);
                if(user) done(null,user);
                else {
                    var user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id
                    });
                    user.save().then((result)=>{
                        done(null, user);
                    }).catch((err)=>{
                        throw err;

                    });
                }
            });
        });
    })
);

passport.use(
    new FacebookStrategy({
            clientID: auth.facebookAuth.clientID,
            clientSecret: auth.facebookAuth.clientSecret,
            callbackURL: auth.facebookAuth.callbackURL,
            profileFields: ['id', 'displayName', 'photos', 'email']
        }, (token, refreshToken, profile, done)=>{
            process.nextTick(function(){
                User.findOne({facebookId: profile.id }, (err, user)=>{
                    if (err) {
                        console.log('Error a buscar usuario mediante facebookID');
                        return done(err);
                    }
                    if(user){
                        console.log('Usuario encontrado');
                        return done(null, user);
                    }else {
                        var newUser = new User({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            facebookId: profile.id
                        });
                        newUser.save(function(err){
                            if(err) return done(err);
                            done(null, newUser);
                        })
                    }
                })
            })
        }
    )
);
module.exports = passport;
