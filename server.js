//npm packages//
var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs')
var app = express();
var PORT = process.env.NODE_ENV || 8080;

//sequelize database setup//
// var Sequelize = require('sequelize');
// var connection = new Sequelize('rutgersflyers_db', 'root');

// //passport
// var passport = require('passport');
// var passportLocal = require('passport-local');

// //middleware
// app.use(require('express-session')({
//     secret: "supersecret",
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         secure: false,
//         maxAge: (1000 * 60 * 60 *24 * 14)
//     },
// }));

// app.use(bodyParser.urlencoded({
//     extended: false
// }));


// //set up handlebars layout
// app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

//set up routes

app.listen(PORT, function(){
    console.log("listening in port %s", PORT);
});


// database connection via sequelize
// connection.sync().then(function() {
//   app.listen(PORT, function() {
//       console.log("Listening on:" + PORT)
//   });
// });