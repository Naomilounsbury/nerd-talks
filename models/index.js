// import all models
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');



// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});
//when the user is deleted any post with the user id is set to null/ not sure about this
Post.belongsTo(User, {
  foreignKey: 'user_id',
});



Comment.belongsTo(User, {
  foreignKey: 'user_id',
});



Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };