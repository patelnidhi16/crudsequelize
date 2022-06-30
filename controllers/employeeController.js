const validationjs = require("../validation/createemployee");

const { Employee } = require("../helper/connection");
const response = require("../response");
const { Op } = require("sequelize");

exports.index = async (req, res) => {
  try {
    const employeeList = await Employee.findAll();
    return response.successResponse(
      "your record fetched successfully",
      employeeList
    );
  } catch (error) {
    return response.errorResponse(
      "Error occurred while fetching record",
      error
    );
  }
};
exports.create = async (req, res) => {
  const validationResult = validationjs(req.body, req, res);
  if (validationResult) {
    if (req.body.id) {
      var employee = await Employee.findOne({
        where: {
          id: {
            [Op.ne]: req.body.id,
          },
          email: req.body.email,
        },
      });

      if (employee == null) {
        try {
          const employee = await Employee.update(
            {
              name: req.body.name,
              email: req.body.email,
              mobile: req.body.mobile,
              image: req.file.originalname,
            },
            {
              where: { id: req.body.id },
            }
          );
          var employeedata = await Employee.findOne({
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
      var employee = await Employee.findOne({
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
          const employee = await Employee.create({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            image: req.file.originalname,
          });
          console.log(employee);
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
    var employeedata = await Employee.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (employeedata) {
      var employee = await Employee.destroy({
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
    var employeedata = await Employee.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (employeedata) {
      var employee = await Employee.destroy({
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
exports.deleteall = async (req, res) => {
  Employee.truncate();
};
