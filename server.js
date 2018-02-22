var express        = require('express')
var app            = express()

var morgan         = require('morgan')
var bodyParser     = require('body-parser')
var methodOverride = require('method-override')

var passport = require('passport');
var flash    = require('connect-flash');

var exphbs = require("express-handlebars");

var port     = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'))
// set the static files location /public/img will be /img for users

app.use(morgan('dev'))
// log every request to the console

app.use(methodOverride())
// simulate DELETE and PUT

app.use(cookieParser())
// read cookies (needed for auth)

app.use(bodyParser())
// get information from html forms



//View Engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.listen(port)
console.log('The magic happens on port ' + port)
