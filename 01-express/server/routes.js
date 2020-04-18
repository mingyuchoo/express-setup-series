var home = require('./handlers/home');
var auth = require('./handlers/auth');
var api = require('./handlers/api');

module.exports = function(app){

  // main routes
  app.get('/', home.index);
  app.get('/about', home.about);
  app.get('/contact', home.contact);

  // auth routes
  app.get('/auth/signup', auth.signup);
  app.get('/auth/login', auth.login);
  app.get('/auth/logout', auth.logout);

  // api
  /*
  ------------------------------------------------------------
  URL                 HTTP Verb    Action
  ============================================================
  /api/puppies        GET          Return ALL puppies
  /api/puppies/:id    GET          Return a SINGLE puppy
  /api/puppies        POST         Add a puppy
  /api/puppies/:id    PUT          Update a puppy
  /api/puppies/:id    DELETE       Delete a puppy
  ------------------------------------------------------------
  */
  app.get('/api', api.index);
  app.get('/api/puppies', api.getAllPuppies);
  app.get('/api/puppies/:id', api.getSinglePuppy);
  app.post('/api/puppies', api.createPuppy);
  app.put('/api/puppies/:id', api.updatePuppy);
  app.delete('/api/puppies/:id', api.removePuppy);

};
