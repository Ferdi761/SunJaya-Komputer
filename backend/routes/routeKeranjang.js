const express = require('express')
const routerKeranjang = express.Router()

const loginCheck = require('../middlewares/loginCheck')
const {
  daftarKeranjang,
  hapusDariKeranjang,
  tambahKeKeranjang,
  ubahJumlahBarang,
  allCartList,
} = require('../controllers/controllerKeranjang')

routerKeranjang.route('/').get(loginCheck, daftarKeranjang)
routerKeranjang
  .route('/:id')
    .delete(loginCheck, hapusDariKeranjang)
    .put(loginCheck, ubahJumlahBarang)
// routerKeranjang.route('/allCart').get(allCartList)

module.exports = routerKeranjang
