var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var fs = require('fs');
var path = require('path');
var logger = require('morgan');
var connectRedis = require('connect-redis');
var config = require('./config/config');

var app = express();
var RedisStore = connectRedis(session);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.sessionOptions.secret));
app.use(express.static(path.join(__dirname, 'public')));

// store sessions
var sessionOptions = config.sessionOptions;
sessionOptions.store = new RedisStore(config.redisConnections);
app.use(session(sessionOptions));

// add routes
require('./routes.js')(app);

// add support for auto views
var autoViews = {};

app.use(function(req, res, next){
    var path = req.path.toLowerCase();
    // check cache; if it's there, render the view
    if(autoViews[path]) {
      return res.render(autoViews[path]);
    }
    // if it's not in the cache, see if there's
    // a .handlebars file that matches
    if(fs.existsSync(__dirname + '/views' + path + '.pug')){
        autoViews[path] = path.replace(/^\//, '');
        return res.render(autoViews[path]);
    }
    // no view found; pass on to 404 handler
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
