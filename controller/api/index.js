const router = require('express').Router();
// need to get all the routes and funnel them through here to render the dashboard
const postRoutes = require("./post-routes");
const commentsRoutes = require("./comments-routes");
const profileRoutes = require("./user-routes");
router.use("/post", postRoutes);
router.use("/comments", commentsRoutes);
router.use("/profile", profileRoutes);

router.get('/', (req, res) => {
  res.render('dashboard');
});

router.use((req, res) => {
  res.send(`<h1>${req.path}Wrong Route!</h1>`)
});

module.exports = router;