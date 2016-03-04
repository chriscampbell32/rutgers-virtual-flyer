var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = ('passport');
var passportLocal = ('passport-local');


// //+++++test
// passport.serializeUser(function(user, done){
//   done(null, user.id);
// });
// passport.deserializeuser(function(id, done){
//   done(null, {id: id, email: id});
// })
// passport.use(new LocalStrategy(
//   function(email, password, done) {
//     User.findOne({ email: email }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));


router.get('/', function(req, res) {
  res.render('home', {title: 'Welcome to Rutgers Flyer'});
});

router.get('/register', function(req, res) {
  res.render('register', {title: 'Register Here'});
});

router.get('/sports', function(req, res){
  res.render('sports', {title: 'sports'})
});

router.get('/login', function(req, res) {
  res.render('login', {title: 'Login Here'});
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

 //requiring passport last
var passport = require('passport');
var passportLocal = require('passport-local');

//check login with db
router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/?msg=Login Credentials do not work'
}));


module.exports = router;
