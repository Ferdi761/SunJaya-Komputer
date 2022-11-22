const express = require("express");
const routerRekening = express.Router();
const isAdmin = require('../middlewares/isAdmin');

const {
    daftarRekening,
    tambahRekening,
    ubahDataRekening,
    hapusRekening
} = require('../controllers/controllerRekening');

routerRekening.route("/").get(daftarRekening);
routerRekening.route("/tambah/:id").post(isAdmin, tambahRekening);
routerRekening.route("/edit/:id").put(isAdmin, ubahDataRekening);
routerRekening.route("/hapus/:id").delete(isAdmin, hapusRekening);

module.exports = routerRekening;