const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//need the get route for all the comments on a post, wait will this get all the comments or the comments for the post
router.get('/', (req, res) => {
  Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
// need to post comments but will need to be logged in to post comments
router.post('/', withAuth, (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  })
    .then(commentData => res.json(commentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

//need to delete comments by id
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(commentData => {
      if (!commentData) {
        res.status(404).json({ message: 'Oopsie, nothing there!' });
        return;
      }
      res.json(commentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;