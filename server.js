//npm packages//
var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs')
var app = express();
var PORT = process.env.PORT || 8080;

var Sequelize = require('sequelize');


if(process.env.NODE_ENV === 'production') {
  // Heroku DB
  console.log(process.env.JawsDB_URL);
  var connection = new Sequelize(process.env.JAWSDB_URL);
} else {
  // local DB
  var connection = new Sequelize('rutgersflyers_db', 'root');
}

//serving static content (rutgers.jpg) from the app from the "public" dir
app.use(express.static('public'));

//bodyParser
app.use(bodyParser.urlencoded({extended: false}));

//routes

var routes = require('./routes/index');
app.use('/', routes);

//set up handlebars layout
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/public', express.static(__dirname + "/public"));


//passport
var passport = require('passport');
var passportLocal = require('passport-local');

app.use(passport.initialize());
app.use(passport.session());

//use method method as callback when authenticating
//config local strategy for passport. local needs a verify function
//that gets the credentials given by the user (username, password)

passport.use(new passportLocal.Strategy (
  function(username, password, done) {
    //check on password
    user.findOne({
      where: {
        username:username,
      }
    }).then(function(user) {
      //check psswrd against hash
        if(user){
          bcrypt.compare(password, user.dataValues.password, function(err, user) {
            if (user) {
              //with a correct psswrd, auth the user with a cookie
            done(null, { id: username, username: username });
            } else {
              done(null, null);
            }
          });
        } else {
          done(null, null);
        }
  });
});

//config passport authenticated user session persistence
//passport must serialize users into and deserialize users out of the session
//supply user id when serializing and query the user record by id from the db when deserializing

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, {id: id, username: id});
});

//passport finished here

//middleware
app.use(require('express-session')({
    secret: "supersecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: (1000 * 60 * 60 *24 * 14)
    },
}));
app.use(passport.initialize());
app.use(passport.session());




// database connection via sequelize
connection.sync().then(function() {
  app.listen(PORT, function() {
      console.log("Listening on:" + PORT)
  });
});
