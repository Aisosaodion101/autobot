const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Autobot = require('./autobot')(sequelize, DataTypes);
db.Post = require('./post')(sequelize, DataTypes);
db.Comment = require('./comment')(sequelize, DataTypes);

module.exports = db;
