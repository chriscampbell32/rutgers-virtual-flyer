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
  var connection = new Sequelize('rutgersflyers_db', 'root');
}

//serving static content (rutgers.jpg) from the app from the "public" dir
app.use(express.static('public'));

//routes
var routes = require('./routes/index');
app.use('/', routes);

//bodyParser
app.use(bodyParser.urlencoded({extended: false}));

//set up handlebars layout
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/public', express.static(__dirname + "/public"));

//using passport authenticate, specifying local strategy
//to authenticate requests
app.post('/login',
  passport.authenticate('local',{ failureRedirect: '/login'}),
  function(req,res) {
    res.redirect('/');
});

//passport
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;

//config local strategy for passport
//the local strategy needs a verify callback that accepts credentials and calls done 
//providing a user
//gets the credentials given by the user (username,psswrd)

//this strategy takes an optional options hast before the function
//both of the below fields define the name of the  properties in the POST body that
//are sent to the server
new LocalStrategy({/userNameField, /passwordField})

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
     if (err) { return done(err); }
     if (!user) { return done(null, false); }
     if (!user.verifyPassword(password)) { return done(null, false); }
     return done(null, user);
    });
  }
)};  

//passport.use(new Strategy(
//  function(username, password, cb) {
//    db.users.findByUsername(username, function(err, user) {
//      if (err) { return cb(err); }
//      if (!user) { return cb(null, false); }
//      if (user.password != password) { return cb(null, false); }
//      return cb(null, user);
//    });
//  }));

//config passport authenticated session persistence
//passport must serialize users into and deserialize users out of
//the session. just supply user ID when serializing and query the 
//user record by ID from the db when deserializing

//parameters by default localstrategy expect to find credentials
//in parameters names username and password.

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'passwrd',
  passReqToCalback: true,
  session: false
},
function(req, username, password, done) {
  //request object is the first argument now
  //...
}
));


passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

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


// database connection via sequelize
connection.sync().then(function() {
  app.listen(PORT, function() {
      console.log("Listening on:" + PORT)
  });
});


