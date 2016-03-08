CREATE DATABASE rutgersflyers_db;

USE rutgersflyers_db;

CREATE TABLE activities_table; (
  id INT AUTO_INCREMENT,
  activityname VARCHAR(30) NOT NULL,
  activityimageurl VARCHAR(50) NOT NULL,
  activitylocation VARCHAR(50) NOT NULL,
  activitydescription VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);  