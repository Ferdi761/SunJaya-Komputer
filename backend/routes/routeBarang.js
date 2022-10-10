const express = require("express");
const routerBarang = express.Router();

const {
    tampilanTambahBarang,
    tambahBarang,
    tampilanDetailBarang,
    tampilanUbahDataBarang,
    ubahDataBarang,
    hapusBarang,
    tampilanDataBarang,
    cariBarang
} = require("../controllers/controllerBarang");

routerBarang.route("/").get(tampilanDataBarang);
routerBarang.route("/tambah").get(tampilanTambahBarang).post(tambahBarang);
routerBarang.route("/:id").get(tampilanDetailBarang);
routerBarang.route("/:id/ubah").get(tampilanUbahDataBarang).post(ubahDataBarang);
routerBarang.route("/:id/hapus").post(hapusBarang);

module.exports = routerBarang;


