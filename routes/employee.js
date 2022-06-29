const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const multer=require("multer")
const store = multer({
  storage: multer.diskStorage({
    destination: function name(req, file, cb) {
      cb(null, "./public/storage");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
}).single("image");

router.get("/index", async (req, res) => {
 var employees= await employeeController.index(req, res);
 res.json(employees);
});

router.post("/create",store, async (req, res) => {
 var employee= await employeeController.create(req, res);
 res.json(employee);
 
});
router.delete("/delete/:id", async (req, res) => {
  var employee=await employeeController.delete(req, res);
 res.json(employee);
  
});
router.get("/edit/:id", async (req, res) => {
 var employee= await employeeController.edit(req, res);
 res.json(employee);
});
module.exports = router;
