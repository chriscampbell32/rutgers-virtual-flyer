var express = require('express');
var router = express.Router();

//require table models
var User = require('../models/user');
var activities = require('../models/activities');
var Sports = require('../models/sports');
var Restaurant = require('../models/restaurant');

//require passport stuff
var passport = require('passport');
var passportLocal = require('passport-local');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');


//bodyParser
router.use(bodyParser.urlencoded({extended: false}));

  passport.use(new passportLocal.Strategy(
    function(username, password, done) {
      //check password in db
      User.findOne({
        where: {
         email: username
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
                  done(null, false);
                }
            });
        } else {
            done(null, null);
        }
    });
  }));  

  
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    done(null, { id: id, username: id })
});

router.get('/', function(req, res) {
   res.render('home');
});


router.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/?msg=Invalid Credentials'

  })
);


router.get('/home', function(req, res) {
  
  res.render('home', {
    user: req.user,
    isAuthenticated: req.isAuthenticated()
  });
});

router.get('/sports', function(req, res){
  console.log("req stuff?" + req); 
  console.log("req session test:" + req.session);
  console.log("req isAuth test:" + req.isAuthenticated());
  console.log("req user test:" + req.user);

  if(req.isAuthenticated()) {
    Sports.findAll({}).then(function(results) {
    res.render('sports', {results});
  });
   } else {
   console.log("user not authenticated") 
   res.redirect('/');
  }
   
});

router.get('/restaurant', function(req, res){
  console.log("req stuff?" + req); 
  console.log("req session test:" + req.session);
  console.log("req isAuth test:" + req.isAuthenticated());
  console.log("req user test:" + req.user);

  if(req.isAuthenticated()) {
    Restaurant.findAll({}).then(function(results) {
    res.render('restaurant', {results});
  });
   } else {
   console.log("user not authenticated") 
   res.redirect('/');
  }

  
});


router.post('/restaurant', function (req, res) {

   // console.log(req.body);
    Restaurant.sync().then(function() { 
      Restaurant.create(req.body).then(function() {
        res.redirect('/restaurant');
        //console.log("works");
      }).catch(function(err) {
        console.log(err);
      });
    });
});

 
router.post('/register', function (req, res) {

   // console.log(req.body);
    User.sync().then(function() { 
      User.create(req.body).then(function() {
        //console.log("works");
        res.render('home');
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
  console.log("req stuff?" + req); 
  console.log("req session test:" + req.session);
  console.log("req isAuth test:" + req.isAuthenticated());
  console.log("req user test:" + req.user);

  if(req.isAuthenticated()) {
    activities.findAll({}).then(function(results) {
    res.render('activities', {results});
  });
   } else {
   console.log("user not authenticated") 
   res.redirect('/');
  }

  
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