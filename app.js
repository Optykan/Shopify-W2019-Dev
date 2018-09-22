var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const ResponseWrapper = require('./util/ResponseWrapper');
const firebaseClient = require('firebase');

const admin = require('firebase-admin');
var serviceAccount = require('./serviceKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var config = {
	apiKey: "AIzaSyDPlcO2Q3zTqloRXT_06loXjeckPCSMQjI",
	authDomain: "shopifyw2019.firebaseapp.com",
	databaseURL: "https://shopifyw2019.firebaseio.com",
	projectId: "shopifyw2019",
	storageBucket: "shopifyw2019.appspot.com",
	messagingSenderId: "427338332488"
};
firebaseClient.initializeApp(config);


var app = express();

var index = require('./routes/index');
var shops = require('./routes/shops');
var auth = require('./routes/auth');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/shops', shops);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  (new ResponseWrapper(res, err)).send();
});

module.exports = app;
