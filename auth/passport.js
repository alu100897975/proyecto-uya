var
    LocalStrategy    = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../models/user.js'),
    passport = require('passport'),
    configAuth = require('./auth.js');


    
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
    
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL
    },

function(token, refreshToken, profile, done){
        process.nextTick(function(){
            User.findOne({'facebookId' : profile.id}, function(err, user){
                if(err){
                    console.log('No se ha encontrado ese ID de Facebook');
                    return done(err);
                }
                
                if(user){
                    return done(null, user); //Usuario encontrado.
                }else{
                    var newUser = new User();   
                    
                    // set all of the facebook information in our user model
                    newUser.facebookId    = profile.id; // set the users facebook id                           
                    newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    
                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            })
        })
    }                                      
))
    
    
module.exports = passport;