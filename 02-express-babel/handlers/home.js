export const index = (req, res) => {
  const session = req.session;
    res.render('index', { title: 'PlayaNetworks' });
};

export const about = (req, res) => {
    res.render('about');
};

export const contact = (req, res) => {
    res.render('contact');
};
