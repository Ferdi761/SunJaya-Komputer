const express = require("express");
const routerSignup = express.Router();

const register = require("../controllers/controllerSignup");

routerSignup.route("/").post(register);

module.exports = routerSignup;