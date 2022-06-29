// const dotenv = require('/Volumes/Data/Node/demo/crudsequelize/.env');
// dotenv.config();
const Sequelize = require("sequelize");

const EmployeeModel = require("/Volumes/Data/Node/demo/crudsequelize/models/employee.js");

const sequelize = new Sequelize("example", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
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

module.exports = {
  sequelize,
  Employee,
};
