// const { Sequelize } = require('sequelize');
// const path = require('path');

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST || '127.0.0.1',
//     port: process.env.DB_PORT || 3306,
//     dialect: 'mysql',
//     logging: false,
//     pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
//   }
// );

// const db = { sequelize, Sequelize };
// db.Transaction = require('./Transaction')(sequelize);
// module.exports = db;

const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const fs = require("fs");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Setup relations if defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
