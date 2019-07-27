exports.signup = function(req, res) {
  res.render('auth/signup');
};

exports.login = function(req, res) {
  var session = req.session;
  res.render('auth/login');
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.log('>>> logout error: ' + err);
    } else  {
      res.redirect('/');
    }
  });
};
