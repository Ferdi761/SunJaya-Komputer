const express = require("express");
const routerAkun = express.Router();

const { listAkun } = require('../controllers/controllerAkun');

routerAkun.route("/all").get(listAkun);

module.exports = routerAkun;