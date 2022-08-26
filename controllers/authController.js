// const User = require("../models/user");
const { User } = require("../helper/connection");
const validationjs = require("../validation/authvalidation");
const response = require("../response");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const redis = require("redis");
const client = redis.createClient();

exports.register = async (req, res) => {
  const validationResult = validationjs(req.body, req, res);
  if (validationResult) {
    const existuser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existuser) {
      return response.notFound("This email already exist");
    } else {
      const salt = await bcrypt.genSalt(10);
  
      const user = await User.create({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),
      });
      return response.successResponse("User Register successfully", user);
    }
  }
};
exports.login = async (req, res) => {
  const validationResult = validationjs(req.body, req, res);
  if (validationResult) {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      const password_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (password_valid) {
        token = jwt.sign(
          { id: user.id, email: user.email },
          config.development.secret
        );
        var jsontoken = JSON.stringify({ token: token });
        var token = JSON.parse(jsontoken);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        client.set(
          user.id,
          JSON.stringify({
            token: token,
            expires: 24 * 60 * 60 * 1000,
          }),
          redis.print
        );
        
        // client.get("key", redis.print);
        return response.successResponse("login successfully", token);
      } else {
        return response.notFound("password not match. Please Try agin!");
      }
    } else {
      return response.notFound("user does not exist");
    }
  }
};
exports.logout = async (req, res) => {
  console.log(req.headers.authorization.replace("Bearer ", ""));
// req.logout();
//   client.del("framework",function (err, reply) {
//     console.log("Redis Del", reply);
//   });
  // res.clearCookie()
  // try {
  //   console.log(req.headers);
  //   const token = req.headers.authorization.replace("Bearer ", "");
  //   decode = jwt.verify(token, config.development.secret);
  //   user = await User.findOne({ id: decode.id });

  //   if (!user) {
  //     throw new Error();
  //   }
  //   req.token = token;
  //   req.user = user;
  // } catch (error) {
  //   res.json({ msg: "unauthorized" });
  // }
  
};

// exports.verify=(req,res)=>{
//   try {
//     const token = req.headers.authorization.replace("Bearer ", "");
//   decode = jwt.verify(token, config.development.secret);
//   user = await User.findOne({ id: decode.id });

//   if (!user) {
//     throw new Error();
//   }
//   req.token = token;
//   req.user = user;
//   }
//  catch (error) {
//   res.json({ msg: "unauthorized" });
// }
// }
