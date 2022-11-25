const express = require("express");
const routerKeranjang = express.Router();

const loginCheck = require('../middlewares/loginCheck');
const {
    daftarKeranjang,
    tambahBarang,
    hapusBarang
} = require("../controllers/controllerKeranjang");

routerKeranjang.route("/")
.get(loginCheck, daftarKeranjang)
.post(loginCheck, tambahBarang)
.delete(loginCheck, hapusBarang);

module.exports = routerKeranjang;