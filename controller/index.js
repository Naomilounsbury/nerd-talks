const router = require('express').Router();
//putting all the page navigtion in one spot
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
//I think i need a login here
//router.use('/login', login-apiRoutes)

module.exports = router;