const express = require("express");
const routerLogout = express.Router();
const logout = require("../controllers/controllerLogout");

routerLogout.route("/").get(logout);

module.exports = routerLogout;