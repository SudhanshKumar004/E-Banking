const express = require("express")
const route = express.Router();
const userController = require("../controller/userController")


route.post("/registration", userController.registration)
route.post("/login", userController.Login)
route.post("/authentication", userController.Authentication)
route.post("/resetpass", userController.PassReset)
route.post("/accInfo", userController.AccInfo)



module.exports = route;