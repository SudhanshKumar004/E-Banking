const express = require("express")
const route = express.Router();
const userController = require("../controller/userController")


route.post("/registration", userController.registration)
route.post("/login", userController.Login)
route.post("/authentication", userController.Authentication)
module.exports = route;