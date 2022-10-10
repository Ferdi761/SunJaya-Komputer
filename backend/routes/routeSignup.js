const express = require("express");
const routerSignup = express.Router();

const { signupView, register } = require("../controllers/controllerSignup");

routerSignup.route("/").get(signupView).post(register);

module.exports = routerSignup;