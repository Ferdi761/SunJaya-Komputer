const express = require("express");
const routerLogout = express.Router();
const logout = require("../controllers/controllerLogout");

routerLogout.route("/").post(logout);

module.exports = routerLogout;