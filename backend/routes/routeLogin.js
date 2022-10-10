const express = require("express");
const routerLogin = express.Router();

const { loginView, login } = require("../controllers/controllerLogin");

routerLogin.route("/").get(loginView).post(login);

module.exports = routerLogin;