module.exports = {
  sessionOptions : {
    secret: 'somesecretkeythatweshouldgenerateandstoresomewhere', //TODO make real secret
    saveUninitialized: true, // save new sessions
    resave: false, // do not automatically write to the session store
    cookie : {
      // secure: true, // TODO set secure to true when https is used
      httpOnly: true,
      maxAge: 1000 * 60 * 60 // 1 hour
    }
  },
  redisConnections : {
    host: 'localhost',  // TODO change redis hostname
    port: 6379 // TODO change redis port
  }
};
