const express = require("express");
const routerJenisBarang = express.Router();

const loginCheck = require('../middlewares/loginCheck');
const isAdmin = require('../middlewares/isAdmin');

const {
    tambahJenis,
    daftarJenis,
    hapusJenis,
    editJenis
} = require('../controllers/controllerJenisBarang');

routerJenisBarang.route("/").get(loginCheck, daftarJenis);
routerJenisBarang.route("/tambah").post(loginCheck, isAdmin, tambahJenis);
routerJenisBarang.route("/hapus/:id").delete(loginCheck, isAdmin, hapusJenis);
routerJenisBarang.route("/edit/:id").put(loginCheck, isAdmin, editJenis);

module.exports = routerJenisBarang;