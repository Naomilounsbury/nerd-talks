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
  onDelete: 'SET NULL'
});
//I think I will need these but they werent working so I took them out
// User.belongsToMany(Post, {
//   foreignKey: 'user_id',
//   onDelete: 'SET NULL'
// });

// Post.belongsToMany(User, {
//   foreignKey: 'post_id',
//   onDelete: 'SET NULL'
// });


Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };