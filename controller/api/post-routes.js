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
// router.get("/:id", (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id", "post_title", "post_text", "created_at"],
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
//     .then((postData) => {
//       if (!postData) {
//         res
//           .status(404)
//           .json({ message: "Oopsie, there is no post with this id" });
//         return;
//       }
//       res.json(postData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
//post a post with auth
router.post("/", withAuth, (req, res) => {
  Post.create({
    post_title: req.body.post_title,
    post_text: req.body.post_text,
    user_id: req.session.user_id,
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/newpost", (req, res) => {
  res.render("newpost");
});
//update a post with auth
router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      post_title: req.body.post_title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
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
