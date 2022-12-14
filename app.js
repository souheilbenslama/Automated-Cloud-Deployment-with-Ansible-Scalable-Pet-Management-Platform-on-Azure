var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var bodyParser = require("body-parser");
var mongoose = require("mongoose");
require('dotenv').config()
//var MongoStore = require("connect-mongo") ;
var indexRouter = require('./routes/index');
//var indexRouter = require('./routes/admin');

var app = express();

mongoose.connect('mongodb://cloudproject:papFeHPFjsp1dFmggZLnxZNjpQyq3e7DpZw5FMcJYoledNb5YQdSP8k431ubttePmk1Bb8yINFI5ACDbxmCH0g==@cloudproject.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cloudproject@',{ useNewUrlParser: true });
const db = mongoose.connection;

/* app.use(session({secret:"security message",resave:true,saveUninitialized:false,store: MongoStore.create({mongoUrl:"mongodb+srv://petsi:petsi@cluster0.mrwox.mongodb.net/test"})}));
app.use(function(req,res,next){
  res.locals.currentUser=req.session.userId;
  next();
}); */

/* view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.on("error",console.error.bind(console,"connection error:"));
app.use(logger('dev'));

app.use('/', indexRouter);
//app.use('/admin', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
