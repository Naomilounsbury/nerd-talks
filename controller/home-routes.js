const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// get all posts for all posts
router.get('/', async (req, res) => {
  console.log('======================');
 try {
   const postData = await
   Post.findAll({
     attributes:[
       "id",
       "post_title",
       "created_at"
     ],
    include: [User]
  })
    //.then(postData => {
      const posts = postData.map(post => post.get({ plain: true }));

      res.render('allposts', { posts, url:req.path, loggedIn: req.session.loggedIn});
    //})
}catch (err){
      console.log(err);
      res.status(500).json(err);
    };
});


// router.post("/signup", (req, res) => {
//   User.create({
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//   })
//     .then((userData) => {
//       req.session.save(() => {
//         req.session.user_id = userData.id;
//         req.session.username = userData.username;
//         req.session.loggedIn = true;

//         res.json(userData);
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.post("/login", (req, res) => {
//   User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   }).then((userData) => {
//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: "Oopsie, there is no user with that email address" });
//       return;
//     }
//     //checkpassword is a function in the user model
//     const validPassword = userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res.status(400).json({ message: "Incorrect password!" });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.username = userData.username;
//       req.session.loggedIn = true;

//       res.json({ user: userData, message: "You are now logged in!" });
//     });
//   });
// });

// router.post("/logout", (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });


// get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_title',
      'post_text',
      'created_at',
   
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = postData.get({ plain: true });

      res.render('viewpost', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});
router.get('/signup',(req, res)=>{
  if(req.session.loggedIn){
    res.redirect('/dashboard');
    return;
}
  res.render('signup')
})

module.exports = router;