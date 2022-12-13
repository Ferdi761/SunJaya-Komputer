const express = require("express");
const routerAkun = express.Router();

const {
    listAkun,
    ubahDataAkun,
    ubahDataAdmin
} = require('../controllers/controllerAkun');
const isAdmin = require('../middlewares/isAdmin');
const loginCheck = require('../middlewares/loginCheck');

routerAkun.route("/admin/all").get(loginCheck, isAdmin, listAkun);
routerAkun.route("/:id/edit").put(loginCheck, ubahDataAkun);
routerAkun.route("/admin/:id/edit").put(loginCheck, isAdmin, ubahDataAdmin);

module.exports = routerAkun;