const express = require('express')
const routerAkun = express.Router()

const {
  listAkun,
  ubahDataAkun,
  ubahDataAdmin,
  listKaryawan,
  hapusAkun,
  detailKaryawan,
} = require('../controllers/controllerAkun')
const isAdmin = require('../middlewares/isAdmin')
const loginCheck = require('../middlewares/loginCheck')

routerAkun.route('/').get(loginCheck, isAdmin, listAkun)
routerAkun.route('/:id').put(loginCheck, ubahDataAkun)
routerAkun
  .route('/karyawan/all')
  .get(loginCheck, isAdmin, listKaryawan)
routerAkun
  .route('/karyawan/:id')
  .get(loginCheck, isAdmin, detailKaryawan)
  .put(loginCheck, isAdmin, ubahDataAdmin)
  .delete(loginCheck, isAdmin, hapusAkun)

module.exports = routerAkun
