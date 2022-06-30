const express=require("express")
const employeeRouter=require("./routes/employee")
const userRouter=require("./routes/user")
const app=express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use("/employees",employeeRouter)
app.use("/user",userRouter)

app.listen(3001)