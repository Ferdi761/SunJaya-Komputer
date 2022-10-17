const { Sequelize, DataTypes, Model } = require("sequelize");
const { HOST, USER, PASSWORD, DB, PORT } = require("./db.config");

const sequelize = new Sequelize(DB, USER, PASSWORD, {
    HOST,
    PORT,
    dialect: 'postgres',
    omitNull: true,
    logging: false,
  });

require("./models/Akun")(sequelize, DataTypes);

module.exports = sequelize;