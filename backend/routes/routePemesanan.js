const express = require("express");
const routerPemesanan = express.Router();

const loginCheck = require('../middlewares/loginCheck');
const {
   checkout
} = require("../controllers/controllerPemesanan");

routerPemesanan.route("/checkout").post(loginCheck, checkout);

module.exports = routerPemesanan;