var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');

router.get('/', function(req, res) {
  res.render('home', {title: 'Welcome to Rutgers Flyer'});
});

router.get('/register', function(req, res) {
  res.render('register', {title: 'Register Here'});
});

router.get('/login', function(req, res) {
  res.render('login', {title: 'Login Here'});
});





module.exports = router;