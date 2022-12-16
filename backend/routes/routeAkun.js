const express = require('express')
const routerAkun = express.Router()

const {
  listAkun,
  ubahDataAkun,
  ubahDataAdmin,
  listKaryawan,
  hapusAkun,
} = require('../controllers/controllerAkun')
const isAdmin = require('../middlewares/isAdmin')
const loginCheck = require('../middlewares/loginCheck')

routerAkun.route('/').get(loginCheck, isAdmin, listAkun)
routerAkun.route('/karyawan').get(loginCheck, isAdmin, listKaryawan)
routerAkun.route('/:id').put(loginCheck, ubahDataAkun)
routerAkun
  .route('/karyawan/:id')
  .put(loginCheck, isAdmin, ubahDataAdmin)
  .delete(loginCheck, isAdmin, hapusAkun)

module.exports = routerAkun
