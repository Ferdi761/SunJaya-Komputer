const express = require('express')
const routerBarang = express.Router()
const path = require('path')

// setup multer storage
const multer = require('multer')

let destFotoBarang = path.join(__dirname, './public/produk')
// console.log(destFotoBarang);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/produk')
  },
  filename: (req, file, cb) => {
    const namaFile = `${Date.now()}-${file.originalname}`
    cb(null, namaFile)
  },
})

const upload = multer({ storage: storage })
const loginCheck = require('../middlewares/loginCheck')

const {
  daftarBarang,
  kategoriBarang,
  tambahBarang,
  detailBarang,
  ubahDataBarang,
  hapusBarang,
  cariBarang,
} = require('../controllers/controllerBarang')

const isAdmin = require('../middlewares/isAdmin')

routerBarang.route('/').get(daftarBarang)
routerBarang.route('kategori/:slug').get(kategoriBarang)
routerBarang.route('/cari').get(cariBarang)
routerBarang
  .route('/tambah')
  .post(loginCheck, isAdmin, upload.single('foto'), tambahBarang)
routerBarang.route('/:id').get(detailBarang)
routerBarang
  .route('/edit/:id')
  .put(loginCheck, isAdmin, upload.single('foto'), ubahDataBarang)
routerBarang.route('/hapus/:id').delete(isAdmin, hapusBarang)

module.exports = routerBarang
