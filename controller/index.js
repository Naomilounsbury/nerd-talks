const router = require("express").Router();
//putting all the page navigtion in one spot
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");

router.use("/", homeRoutes);
router.use("/dash", dashboardRoutes);
router.use("/api", apiRoutes);
//I think i need a login here
//router.use('/login', login-apiRoutes)

// router.get("/dash", (req, res) => {
//   res.render("dash", { layout: "dashboard", loggedIn: req.session.loggedIn });
// });

module.exports = router;
