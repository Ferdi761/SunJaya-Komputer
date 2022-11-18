const express = require("express");
const routerAkun = express.Router();

const {
    listAkun,
    ubahDataAkun
} = require('../controllers/controllerAkun');
const isAdmin = require('../middlewares/isAdmin');

routerAkun.route("/admin/all").get(isAdmin, listAkun);
routerAkun.route("/:id/edit").put(ubahDataAkun);
routerAkun.route("/admin/:id/edit").put(isAdmin, ubahDataAkun);

module.exports = routerAkun;