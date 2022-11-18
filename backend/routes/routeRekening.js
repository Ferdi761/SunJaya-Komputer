const express = require("express");
const routerRekening = express.Router();

const {
    daftarRekening,
    tambahRekening,
    ubahDataRekening,
    hapusRekening
} = require('../controllers/controllerRekening');

routerRekening.route("/").get(daftarRekening);
routerRekening.route("/tambah").post(tambahRekening);
routerRekening.route("/edit").put(ubahDataRekening);
routerRekening.route("/hapus").delete(hapusRekening);

module.exports = routerRekening;