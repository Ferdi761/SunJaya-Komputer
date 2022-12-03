const express = require("express");
const routerBarang = express.Router();
const path = require("path");

// setup multer storage
const multer = require("multer");

destFotoBarang = path.join(__dirname, '../../frontend/src/assets/img/produk');
// console.log(destFotoBarang);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destFotoBarang);
    },
    filename: (req, file, cb) => {
      const namaFile = `${Date.now()}-${file.originalname}`;
      cb(null, namaFile);
    }
  });
  
const upload = multer({ storage: storage });
const loginCheck = require('../middlewares/loginCheck');

const {
    daftarBarang,
    tambahBarang,
    detailBarang,
    ubahDataBarang,
    hapusBarang,
    cariBarang
} = require('../controllers/controllerBarang');

const { tambahKeKeranjang } = require('../controllers/controllerKeranjang');

routerBarang.route("/").get(daftarBarang);
routerBarang.route("/cari").get(cariBarang);
routerBarang.route("/tambah").post(upload.single('foto'), tambahBarang);
routerBarang.route("/detail")
.get(detailBarang)
.post(loginCheck, tambahKeKeranjang);
routerBarang.route("/edit/:id").put(upload.single('foto'), ubahDataBarang);
routerBarang.route("/hapus/:id").delete(hapusBarang);

module.exports = routerBarang;


