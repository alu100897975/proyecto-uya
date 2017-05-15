var passport = require('../config/passport'),
    router = require('express').Router();

router.get('/signup', (req,res)=>{
    res.render('signup');
});
router.get('/login', (req,res)=>{
    res.render('login');
})
router.post('/signup',
    function(req,res){
        passport.authenticate('local-signup', function(validation){
            console.log(validation.code, validation.msg)
            res.status(validation.code).json({message: validation.msg});
        })(req,res);
    }
);

router.post('/login',
    function(req, res){
        passport.authenticate('local-login', function(validation){
            console.log(validation.code, validation.msg)
            res.status(validation.code).json({message: validation.msg});
        })(req,res);
    }
);

//Login con Facebook
router.get('/with-facebook',passport.authenticate('facebook', {scope: ['email']} ));

router.get('/with-facebook/return',
            passport.authenticate('facebook', {
                successRedirect: '/',
                failureRedirect: '/join/login'
            })
);


// Login con google

router.get('/with-google',
            passport.authenticate('google', { scope: ['email', 'profile']} ));
router.get('/with-google/return',
            passport.authenticate('google',{
                successRedirect: '/',
                failureRedirect: '/join/login'
            })
);


module.exports = router;
