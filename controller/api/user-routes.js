const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");


//create a user
router.post("/signup", async (req, res) => {
  try{
    console.log("STARTING SIGNUP")
  const newUser = await
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  console.log("STARTING SAVE SESSION")
    //.then((userData) => {
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.username = newUser.username;
        req.session.loggedIn = true;

        res.json(newUser);
        console.log("SIGNUP DONE")
      });
    //})
    }catch(err){
      console.log(err);
      res.status(500).json(err);
    };
});

router.post("/login", async (req, res) => {
  try{
  const loginUser = await
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
  //.then((userData) => {
    if (!loginUser) {
      res
        .status(400)
        .json({ message: "Oopsie, there is no user with that email address" });
      return;
    }
    //checkpassword is a function in the user model
    const validPassword = loginUser.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = loginUser.id;
      req.session.username = loginUser.username;
      req.session.loggedIn = true;

      res.json({ user: loginUser, message: "You are now logged in!" });
    });
  //});
}
catch(err){
  console.log(err)
  res.status(500).json(err)
}
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// router.put("/:id", (req, res) => {
//   // pass in req.body instead to only update what's passed through
//   User.update(req.body, {
//     individualHooks: true,
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((userData) => {
//       if (!userData) {
//         res
//           .status(404)
//           .json({ message: "Oopsie, there is no user with this id" });
//         return;
//       }
//       res.json(userData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
//delete a user
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
