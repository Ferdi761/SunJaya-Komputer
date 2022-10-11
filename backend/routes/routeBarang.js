const express = require("express");
const routerBarang = express.Router();

const {
    tambahBarang,
    detailBarang,
    ubahDataBarang,
    hapusBarang,
    cariBarang
} = require("../controllers/controllerBarang");

routerBarang.route("/tambah").post(tambahBarang);
routerBarang.route("/:id").get(detailBarang);
routerBarang.route("/:id/ubah").put(ubahDataBarang);
routerBarang.route("/:id/hapus").delete(hapusBarang);

module.exports = routerBarang;


