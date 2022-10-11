const express = require("express");
const routerLogin = express.Router();

const login = require("../controllers/controllerLogin");

routerLogin.route("/").post(login);

module.exports = routerLogin;