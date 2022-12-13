const express = require("express");
const routerKeranjang = express.Router();

const loginCheck = require('../middlewares/loginCheck');
const {
    daftarKeranjang,
    hapusDariKeranjang,
    allCartList
} = require("../controllers/controllerKeranjang");

routerKeranjang.route("/").get(loginCheck, daftarKeranjang);
routerKeranjang.route("/:id").delete(loginCheck, hapusDariKeranjang);
routerKeranjang.route("/allCart").get(allCartList);

module.exports = routerKeranjang;