const config = require('../config/config.json');
// dotenv.config();
const Sequelize = require("sequelize");

const EmployeeModel = require("../models/employee");
const UserModel = require("../models/user");

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,
  logging: true,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });

const Employee = EmployeeModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

module.exports = {
  sequelize,
  Employee,
  User,

};
