const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    }
    if(req.session.loggedIn){
      next()
    }
  };
  
  module.exports = withAuth;