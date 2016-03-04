//npm packages//
var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs')
var app = express();
var PORT = process.env.PORT || 8080;
var cookieParser = require('cookie-parser');
var bcrypt = require("bcryptjs");
var bodyParser = require('body-parser');
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

//check login with db
app.post('/check', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/?msg=Login Credentials do not work'
}));

//middleware init
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

  passport.use(new passportLocal(function(username, password, done) {
    //check password in db
    User.findOne({
      where: {
        username: username
      }
    }).then(function(user) {
      //check psswrd against hash
      if (user) {
        bcrypt.compare(password, user.dataValues.password, function(err, user) {
          if (user) {
              //if password is right auth. the user w cookie
              done(null, { id: username, username: username });
            } else {
              done(null, null);
            }
        });
      } else {
        done(null, null);
    }
  });

  })); 

//config passport authenticated session persistence
//passport must serialize users into and deserialize users out of
//the session. just supply user ID when serializing and query the 
//user record by ID from the db when deserializing

//parameters by default localstrategy expect to find credentials
//in parameters names username and password.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
   done(null, { id: id, username: id })
}); 



var User = connection.define('user', {
  username: {
    type: Sequelize.STRING,
    allownull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
             args: [5, 10],
             msg: "Your password must be between 5-10 characters"
            },
            isUpperCase: true
    }
  }
},{
    hooks: {
          beforeCreate: function(input){
            input.password = bcrypt.hashSync(input.password, 10);
          }
    }
});
      
//config local strategy for passport
//the local strategy needs a verify callback that accepts credentials and calls done 
//providing a user
//gets the credentials given by the user (username,psswrd)

//this strategy takes an optional options hast before the function
//both of the below fields define the name of the  properties in the POST body that
//are sent to the server

passport.use(new passportLocal(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
     if (err) { return done(err); }
     if (!user) { return done(null, false); }
     if (!user.verifyPassword(password)) { return done(null, false); }
     return done(null, user);
    });
  }
))

// app.post("/login", passport.authenticate) {

// }


// database connection via sequelize
connection.sync().then(function() {
  app.listen(PORT, function() {
      console.log("Listening on:" + PORT)
  });
});