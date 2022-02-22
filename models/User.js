//so apparently all Im using from sequelize is models and datatypes
//bcrypt is a pain because it stopped the whole show for a bit
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// creating the User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  //creating a function called checkPassword to compare the login password and the password actually would it be a method here?
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// create fields/columns for User model need id username email and password
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
     
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      // The server still gets the datat but it knows theres a hook here 
      //so it say to itself, Ive got to run this code before i create it in the database
      
      async beforeCreate(newUserData) {
        console.log(newUserData)
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;