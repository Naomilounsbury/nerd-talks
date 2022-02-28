const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all the posts with the id url title and time
// router.get("/", (req, res) => {
//   console.log("======================");
//   Post.findAll({
//     attributes: ["id", "post_title", "post_text", "created_at"],
//     //include comments and users
//     include: [
//       {
//         model: Comment,
//         attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
//         include: {
//           model: User,
//           attributes: ["username"],
//         },
//       },
//       {
//         model: User,
//         attributes: ["username"],
//       },
//     ],
//   })
//     //the return that data
//     .then((postData) => res.json(postData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
// // get a single post by id
router.get("/:id", (req, res) => {
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
        res
          .status(404)
          .json({ message: "Oopsie, there is no post with this id" });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//post a post with auth
router.post("/", withAuth, async (req, res) => {
  console.log("POST START", { data: req.body });
  try {
    const postData = await Post.create({
      post_title: req.body.post_title,
      post_text: req.body.post_text,
      user_id: req.session.user_id,
    });
    //.then((postData) =>
    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/newpost", (req, res) => {
  res.render("newpost");
});
//update a post with auth
//the try catch is what makes it work because it runs at the same time so I need to give it time to run the update so I need the async await to run this
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updateData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    //.then((postData) => {
    if (!updateData) {
      res
        .status(404)
        .json({ message: "Oopsie, there is no post with this id" });
      return;
    }
    res.json(updateData);
    //})
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// delete a post with auth
router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      if (!postData) {
        res
          .status(404)
          .json({ message: "Oopsie, there is no post with this id" });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
