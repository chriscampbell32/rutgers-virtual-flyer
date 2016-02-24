//npm packages//
var express = require('express');
var expressHandlebars = require('express-handlebars');
var Sequelize = require('sequelize');
var passport = require('passport');
var passportLocal = require('passport-local');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs')
var app = express();
var PORT = process.env.NODE_ENV || 8080;

//sequelize database setup//

//set up handlebars layout
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.listen(PORT, function(){
    console.log("listening on port %s", PORT);
});