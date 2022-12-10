const express = require("express");
const routerGaransi = express.Router();

const loginCheck = require('../middlewares/loginCheck');
const isAdmin = require('../middlewares/isAdmin');

const {
    ajukanGaransi,
    konfirmasiGaransi,
    tolakGaransi
} = require('../controllers/controllerGaransi');

routerGaransi.route('/ajukan/:id').post(loginCheck, konfirmasiGaransi);

routerGaransi.route('/admin/konfirmasi/:id').post(loginCheck, isAdmin, konfirmasiGaransi);