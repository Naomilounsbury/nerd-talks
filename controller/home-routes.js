const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

// get all posts for all posts
router.get("/:user_id", async (req, res) => {
  console.log("======================");
  try {
    const postData = await Post.findAll({
      attributes: ["id", "post_title", "created_at"],
      include: [User],
    });
    //.then(postData => {
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("home", {
      posts,
      url: req.path,
      loggedIn: req.session.loggedIn,
    });
    //})
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get single post
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_title", "post_text", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      const post = postData.get({ plain: true });

      res.render("viewpost", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dash");
    return;
  }

  res.render("login");
});
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dash");
    return;
  }
  res.render("signup");
});

module.exports = router;
