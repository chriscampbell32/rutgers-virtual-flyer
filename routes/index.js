var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var activities = require('../models/activities');

router.get('/', function(req, res) {
  res.render('home', {title: 'Welcome to Rutgers Flyer'});
});

router.get('/register', function(req, res) {
  res.render('register', {title: 'Register Here'});
});

router.get('/login', function(req, res) {
  res.render('login', {title: 'Login Here'});
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