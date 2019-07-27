exports.index = function(req, res) {
  var session = req.session;
    res.render('index', { title: 'PlayaNetworks' });
};

exports.about = function(req, res) {
    res.render('about');
};

exports.contact = function(req, res) {
    res.render('contact');
};
