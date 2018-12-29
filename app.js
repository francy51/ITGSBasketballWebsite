var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")
var mongoConfig = require("./config/mongo")
var jwt = require('jwt-express');
var jwtConfig = require("./config/jwt")
var session = require("express-session")
var passport = require("passport")
var passportConfig = require("./config/passport")(passport)
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var adminRouter = require("./routes/admin");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(jwt.init(jwtConfig.secret));
// required for passport
//TODO CREATE A SESSION CONFIG
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessio

mongoose.connect(mongoConfig.url);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(fileUpload({ safeFileNames: false, preserveExtension: true }))

app.use('/', indexRouter);
require('./routes/users')(app, passport);
app.use('/admin', adminRouter);

module.exports = app;
