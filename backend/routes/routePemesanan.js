const express = require('express')
const routerPemesanan = express.Router()
const path = require('path')

// setup multer storage
const multer = require('multer')

let destBuktiBayar = path.join(__dirname, './public/buktiPembayaran')
// console.log(destBuktiBayar);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/buktiPembayaran')
  },
  filename: (req, file, cb) => {
    const namaFile = `${Date.now()}-${file.originalname}`
    cb(null, namaFile)
  },
})

const upload = multer({ storage: storage })

const loginCheck = require('../middlewares/loginCheck')
const isAdmin = require('../middlewares/isAdmin')

const {
  checkout,
  detailPesanan,
  uploadBuktiBayar,
  daftarSemuaPesanan,
  pesananSelesai,
  umpanBalik,
  byd,

  // ADMIN ONLY
  semuaPesananPelanggan,
  daftarKonfirmasiPesanan,
  konfirmasiPesanan,
  batalkanPesanan,
  ubahStatusKirim,
  konfirmasiPesananSampai,
  pengirimanPesanan,
} = require('../controllers/controllerPemesanan')

routerPemesanan.route('/').get(loginCheck, daftarSemuaPesanan)
// routerPemesanan.route('/:id').get(loginCheck, detailPesanan)
routerPemesanan.route('/checkout').post(loginCheck, checkout)
routerPemesanan
  .route('/checkout/upload/:id')
  .put(loginCheck, upload.single('buktiPembayaran'), uploadBuktiBayar)
routerPemesanan.route('/selesai/:id').put(loginCheck, pesananSelesai)
routerPemesanan.route('/ulasan/:id').put(loginCheck, umpanBalik)
// check only
routerPemesanan.route('/byd/:pmsID').get(byd)

// ADMIN ONLY
routerPemesanan
  .route('/admin/')
  .get(loginCheck, isAdmin, semuaPesananPelanggan)
routerPemesanan
  .route('/admin/konfirmasi')
  .get(loginCheck, isAdmin, daftarKonfirmasiPesanan)
routerPemesanan
  .route('/admin/konfirmasi/:id')
  .post(loginCheck, isAdmin, konfirmasiPesanan)
routerPemesanan
  .route('/admin/pengiriman/:id')
  .post(loginCheck, isAdmin, pengirimanPesanan)
routerPemesanan
  .route('/admin/batalkan/:id')
  .delete(loginCheck, isAdmin, batalkanPesanan)
routerPemesanan
  .route('/admin/kirim/:id')
  .put(loginCheck, isAdmin, ubahStatusKirim)
routerPemesanan
  .route('/admin/sampai/:id')
  .put(loginCheck, isAdmin, konfirmasiPesananSampai)

module.exports = routerPemesanan
