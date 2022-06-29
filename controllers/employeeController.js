const validationjs = require("../validation/createemployee");
const Employee = require("../models/employee");
const conn = require("../helper/connection");
const response = require("../response");
const { Op } = require("sequelize");
exports.index = async (req, res) => {
  try {
    const employeeList = await conn.Employee.findAll();
    return response.successResponse(
      "your record fetched successfully",
      employeeList
    );
  } catch (error) {
    return response.errorResponse(
      "Error occurred while deleting record",
      error
    );
  }
};
exports.create = async (req, res) => {
  const validationResult = validationjs(req.body, req, res);
  if (validationResult) {
    if (req.body.id) {
      var employee = await conn.Employee.findOne({
        where: {
          id: {
            [Op.ne]: req.body.id,
          },
          email: req.body.email,
        },
      });
      console.log(employee);
      if (employee == null) {
        try {
          const employee = await conn.Employee.update(
            {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              image: req.file.originalname,
            },
            {
              where: { id: req.body.id },
            }
          );
          var employeedata = await conn.Employee.findOne({
            where: {
              id: req.body.id,
            },
          });
          if (employee) {
            return response.successResponse(
              "Your Record updated Successfully ",
              employeedata
            );
          }
        } catch (error) {
          return response.errorResponse(
            "Error occurred while insertion of record",
            error
          );
        }
      } else {
        res.json({
          message: "email already exist",
          status: false,
          status: 200,
        });
      }
    } else {
      var employee = await conn.Employee.findOne({
        where: {
          email: req.body.email,
          id: !req.body.id,
        },
      });
      if (employee != null) {
        res.json({
          message: "email already exist",
          status: false,
          status: 200,
        });
      } else {
        try {
          const employee = await conn.Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            image: req.file.originalname,
          });
          return response.successResponse(
            "Your Record inserted  Successfully ",
            employee
          );
        } catch (error) {
          return response.errorResponse(
            "Error occurred while insertion of record",
            error
          );
        }
      }
    }
  }
};
exports.edit = async (req, res) => {
  try {
    var employeedata = await conn.Employee.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (employeedata) {
      var employee = await conn.Employee.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (employee) {
        return response.successResponse(
          "your record listing successfully",
          employeedata
        );
      }
    } else {
      return response.notFound("This record not exist");
    }
  } catch (error) {
    return response.errorResponse("Error occurred while listing record", error);
  }
};
exports.delete = async (req, res) => {
  try {
    var employeedata = await conn.Employee.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (employeedata) {
      var employee = await conn.Employee.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (employee) {
        return response.successResponse(
          "your record deleted successfully",
          employeedata
        );
      }
    } else {
      return response.notFound("This record not exist");
    }
  } catch (error) {
    return response.errorResponse(
      "Error occurred while deleting record",
      error
    );
  }
};
