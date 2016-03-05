//npm packages//
var express = require('express');
var expressHandlebars = require('express-handlebars');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs')
var app = express();
var PORT = process.env.PORT || 8080;
var cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));

var Sequelize = require('sequelize');

//passport
var passport = require('passport');
var passportLocal = require('passport-local');

if(process.env.NODE_ENV === 'production') {
  // Heroku DB
  console.log(process.env.JawsDB_URL);
  var connection = new Sequelize(process.env.JAWSDB_URL);
} else {
  var connection = new Sequelize('rutgersflyers_db', 'root', '');
}

//serve static content using absolute path of the dir 
app.use('/static', express.static('/public'));
app.use(express.static('public'));

//http://localhost:3000/static/images/Livingston.jpg

//bodyParser
app.use(bodyParser.urlencoded({extended: false}));


//set up handlebars layout
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/public', express.static(__dirname + "/public"));

//using passport authenticate, specifying local strategy
//to authenticate requests

// app.use(require('express-session')({
//     secret: "supersecret",
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//         secure: false,
//         maxAge: (1000 * 60 * 60 *24 * 14)
//     },
// }));
// last minute sess test
var sess = {
  secret: "supersecret",
  resave: true,
  saveUninitialized: true,
  cookie: {
      secure: false,
      maxAge: (1000 * 60 * 60 *24 * 14)
  }
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy 
  sess.cookie.secure = true // serve secure cookies 
}
 
app.use(expressSession(sess))

// added 
app.use(passport.initialize());
app.use(passport.session());


//parameters by default localstrategy expect to find credentials
//in parameters names username and password.
//routes

var routes = require('./routes/index');
app.use('/', routes);
// database connection via sequelize
connection.sync().then(function() {
  app.listen(PORT, function() {
      console.log("Listening on:" + PORT)
  });
});