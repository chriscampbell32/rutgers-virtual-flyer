var express = require('express');
var router = express.Router();
//require table models
var User = require('../models/user');
var Sports = require('../models/sports');
var passport = require('passport');
var passportLocal = require('passport-local');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');

console.log('routes/index.js loaded');

// will remove later 
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
        
    //       console.log("fire fire fire" + user);          
    //       console.log("username check");
    //       if (!user) {
    //         console.log("invalid username");
    //         return done(null, false, {message: 'Incorrect username.'});
    //       }
    //       console.log("password check");
    //       console.log(user);
    //       console.log(typeof user);
    //       if (!user.dataValues.password === password) {
    //         console.log("invalid password");
    //         return done(null, false, {message: 'Incorrect password.' });
    //       }
    //       console.log("fire fire close for real2");
    //       return done(null, { id:username, username: username});
    //     // done(user);
    //       // console.log('show me things:' + user);
    //   }); 
    // }
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
