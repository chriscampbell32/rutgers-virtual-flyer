var Sequelize = require('sequelize');
var connection = new Sequelize('rutgersflyers_db', 'root');

var Activities = connection.define('Activities', {
  activityname: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  activityimageurl: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  }
  activitylocation: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  },
  activitydescription: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false
  }
});


module.exports = Activities;  