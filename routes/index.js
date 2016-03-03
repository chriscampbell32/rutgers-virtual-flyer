var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res) {
  res.render('home', {title: 'Welcome to Rutgers Flyer'});
});

router.get('/register', function(req, res) {
  res.render('register', {title: 'Register Here'});
});

router.get('/login', function(req, res) {
  res.render('login', {title: 'Login Here'});
});

router.post('/login', function(req, res) {
      var email = req.body.email;
      var password = req.body.password;
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


module.exports = router;
