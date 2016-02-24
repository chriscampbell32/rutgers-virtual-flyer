//express
var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs')
var app = express();
var PORT = process.env.NODE_ENV || 8080;




app.listen(PORT, function(){
    console.log("listening on port %s", PORT);
});