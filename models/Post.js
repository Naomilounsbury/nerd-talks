const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Post extends Model {
}

// create fields/columns for Post model
// foreign key for post
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_text:{
      type: DataTypes.STRING,
      allowNull:false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;