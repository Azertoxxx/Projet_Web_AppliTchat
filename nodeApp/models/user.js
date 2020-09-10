'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    phoneNumber: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Message); /* Un utilisateur reçoit plusieurs messages */
  };
  return User;
};

