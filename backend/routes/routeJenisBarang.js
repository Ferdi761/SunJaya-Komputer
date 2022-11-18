const express = require("express");
const routerJenisBarang = express.Router();

const {
    tambahJenis,
    daftarJenis,
    hapusJenis,
    editJenis
} = require('../controllers/controllerJenisBarang');

routerJenisBarang.route("/").get(daftarJenis);
routerJenisBarang.route("/tambah").post(tambahJenis);
routerJenisBarang.route("/:id/hapus").delete(hapusJenis);
routerJenisBarang.route("/:id/edit").put(editJenis);

module.exports = routerJenisBarang;