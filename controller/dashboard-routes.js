const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// get all posts for dashboard
//three parameters path,auth, callback
//I want this to be async so add async
router.get("/", withAuth, async (req, res) => {
  console.log(req.session, "DOGS");
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "post_title", "post_text", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
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
    });
    // .then(postData => {
    //this is mapping the data in an array
    console.log(req.session, "PIGS");
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(req.session, "DUDE");
    res.render("dash", {
      layouts: "dashboard",
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, (req, res) => {
  //find by primary key is similar to find one but faster
  Post.findByPk(req.params.id, {
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
      if (postData) {
        const post = postData.get({ plain: true });

        res.render("editposts", {
          post,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
