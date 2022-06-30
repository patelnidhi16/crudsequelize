var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const conn = require("../helper/connection");
const authController = require("../controllers/authController");
router.post("/register", async (req, res, next) => {
  var user = await authController.register(req, res);
  res.json(user);
});
router.post("/login", async (req, res, next) => {
  var user = await authController.login(req, res);
  res.json(user);
});
router.get("/logout", async (req, res, next) => {
  var user = await authController.logout(req, res);
res.write('user')
});

module.exports = router;
