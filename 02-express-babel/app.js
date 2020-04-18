import config from './config/config';
import express from 'express';
import session from 'express-session';
import ConnectRedis from 'connect-redis';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import logger from 'morgan';
import path from 'path';

const app = express();
const RedisStore = ConnectRedis(session);

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

// store sessions to redis
const sessionOptions = config.sessionOptions;
sessionOptions.store = new RedisStore(config.redisConnections);
app.use(session(sessionOptions));

// routes (index, users, ...)
// require('./routes.js')(app);
import routes from './routes.js';
routes(app)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})

// error handlers

// development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export default app;
