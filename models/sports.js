var Sequelize = require('sequelize');
var connection = new Sequelize('rutgersflyers_db', 'root');

var Sports = connection.define('sport', {
  sport: {
    type:Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  
  description:{
    allowNull: false,
    type:Sequelize.STRING,
    validate: {
      len: {
        args: [1, 150],
        msg: "Description must be less than 150 characters"
      }
    }
  }
});

module.exports = Sports;