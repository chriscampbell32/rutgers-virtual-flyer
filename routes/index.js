var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var passportLocal = require('passport-local');

console.log('routes/index.js loaded');

// will remove later 
  passport.use(new passportLocal.Strategy(function(username, password, done) {
      //check password in db
      console.log(username);
      console.log(password);
      User.findOne({
        where: {
        // username: username
          email: username,
          password: password
        }
      }).then(function(results) {
          // console.log("fire fire fire");
          // if (err) {return done(err); }
          // if (!user) {
          //   return done(null, false, {message: 'Incorrect username.'});
          // }
          // if (!user.validPassword(password)) {
          //   return done(null, false, {message: 'Incorrect password.' });
          // }
          // console.log('show me things:' + user)
          // return done(null, user);
        // console.log(results.dataValues);
        done(results);
      }); 
    }));  
  // remove above when modluarizing



router.get('/', function(req, res) {
  // console.log("were here")
  res.render('home');
});

router.get('/register', function(req, res) {
  res.render('register', {title: 'Register Here'});
});


router.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/register'
  })
);


router.get('/login', function(req, res) {
  res.render('login', {title: 'Login Here'});
});


router.get('/home', function(req, res) {
  res.render('home');
});

router.get('/sports', function(req, res){
  res.render('sports');
});

 
router.post('/register', function (req, res) {

   // console.log(req.body);
    User.sync().then(function() { 
      User.create(req.body).then(function() {
        //console.log("works");
      }).catch(function(err) {
        console.log(err);
      });
    });
});


// router.post('/login',
//   passport.authenticate('local', { 
//     successRedirect: '/',
//     failureRedirect: '/register'}
//   )//,
//   // function(req,res) {
//   //   res.redirect('/');
// );

// router.post('/login', function (req, res){
//   console.log("post to /login");
// });




module.exports = router;
