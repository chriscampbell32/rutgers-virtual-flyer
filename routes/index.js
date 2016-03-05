var express = require('express');
var router = express.Router();

//require table models
var User = require('../models/user');
var activities = require('../models/activities');
var Sports = require('../models/sports');

//require passport stuff
var passport = require('passport');
var passportLocal = require('passport-local');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');

console.log('routes/index.js loaded');
//config passport authenticated session persistence
//passport must serialize users into and deserialize users out of
//the session. just supply user ID when serializing and query the 
//user record by ID from the db when deserializing
// will remove later 

//config local strategy for passport
//the local strategy needs a verify callback that accepts credentials and calls done 
//providing a user
//gets the credentials given by the user (username,psswrd)


  passport.use(new passportLocal.Strategy(
    function(username, password, done) {
      //check password in db
      User.findOne({
        where: {
        // username: username
          email: username//,
          // password: password
        }
    }).then(function(user) {
    console.log("wtf");
     if(user){
      console.log("hitting");
            bcrypt.compare(password, user.dataValues.password, function(err, user) {
                if (user) {
                  console.log("I found the user and password you're welcome.");
                  //if password is correct authenticate the user with cookie
                  done(null, { id: username, username: username });
                } else{
                  console.log('naaaaaah, failz')
                  done(null, null);
                }
            });
        } else {
            done(null, null);
        }
    });
  }));  
  // remove above when modluarizing

//change the object used to authenticate to a smaller token, and protects the server from attacks
//parameters by default localstrategy expect to find credentials
//in parameters names username and password.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    done(null, { id: id, username: id })
});

router.get('/', function(req, res) {
  // console.log("were here")
  res.render('home');
});

// router.get('/register', function(req, res) {
//   res.render('register', {title: 'Register Here'});
// });


router.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/register'
  })
);



router.get('/home', function(req, res) {
  //console.log('req all the things ' + JSON.parse(JSON.stringify(req);
  res.render('home', {
    user: req.user,
    isAuthenticated: req.isAuthenticated()
  });
});

router.get('/sports', function(req, res){
  Sports.findAll({}
  ).then(function(results){
    console.log(results);
    res.render('sports', {results});
    
  });
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

router.post('/sports', function (req, res) {

   // console.log(req.body);
    Sports.sync().then(function() { 
      Sports.create(req.body).then(function() {
        res.redirect('/sports');
        //console.log("works");
      }).catch(function(err) {
        console.log(err);
      });
    });
});

router.get('/activities', function (req, res) {
  activities.findAll({}).then(function(result) {
    console.log(result);
    res.render('activities', {result});
  })
});


router.post('/activities', function (req, res) {
  console.log(req.body);

     activities.sync().then(function() {
     activities.create(req.body).then(function() {
       console.log("works");
       res.redirect('/activities');
      }).catch(function(err) {
       console.log(err);
      });
    });
});


module.exports = router;