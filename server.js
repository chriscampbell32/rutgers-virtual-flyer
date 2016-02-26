var PORT = process.env.PORT || 8080;
//npm packages
var express = require('express');
//var dotenv = require('dotenv').config();
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var app = express();


//sequelize database setup//
var Sequelize = require('sequelize');
var sequelize = new Sequelize('rutgersflyers_db', 'root');
    
var connection = mysql.createConnection(
    process.env.JAWSDB_URL || {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'rutgersflyers_db',
});
//console.log("connection created is " + connection);
connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});




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

app.get("/", function(req, res){
    res.send('hello world');
})

app.listen(PORT, function(){
    console.log("listening in port %s", PORT);
});


// database connection via sequelize
// connection.sync().then(function() {
//   app.listen(PORT, function() {
//       console.log("Listening on:" + PORT)
//   });
// });