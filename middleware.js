export const logMiddleware = (req, res, next) => {
    const timestamp = new Date().toUTCString();
    const method = req.method;
    const route = req.originalUrl;
    const authenticated = req.session.user ? 'Authenticated' : 'Non-Authenticated';
    const role = req.session.user ? req.session.user.role : 'N/A';
  
    console.log(`[${timestamp}]: ${method} ${route} (${authenticated} ${role})`);
    next();
  };
  
  export const authMiddleware = (req, res, next) => {
    if (req.path === '/') {
      if (req.session.user) {
        if (req.session.user.role === 'admin') {
          return res.redirect('/administrator');
        } else {
          return res.redirect('/user');
        }
      } else {
        return res.redirect('/signinuser');
      }
    }
    next();
  };
  
  export const signInMiddleware = (req, res, next) => {
    if (req.session.user) {
      if (req.session.user.role === 'admin') {
        return res.redirect('/administrator');
      } else {
        return res.redirect('/user');
      }
    }
    next();
  };
  
  export const signUpMiddleware = (req, res, next) => {
    if (req.session.user) {
      if (req.session.user.role === 'admin') {
        return res.redirect('/administrator');
      } else {
        return res.redirect('/user');
      }
    }
    next();
  };
  
  export const userMiddleware = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/signinuser');
    }
    next();
  };
  
  export const adminMiddleware = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/signinuser');
    } else if (req.session.user.role !== 'admin') {
      return res.status(403).render('error', { errorMessage: 'You do not have permission to view this page.', themePreference: req.session.user.themePreference });
    }
    next();
  };
  
  export const signOutMiddleware = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/signinuser');
    }
    next();
  };