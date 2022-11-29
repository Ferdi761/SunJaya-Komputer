const express = require("express");
const routerBarang = express.Router();
const path = require("path");

// setup multer storage
const multer = require("multer");

destFotoBarang = path.join(__dirname, '..', 'assets', 'imgBarang');
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

const {
  tambahKeKeranjang,
  hapusDariKeranjang
} = require('../controllers/controllerKeranjang');

routerBarang.route("/").get(daftarBarang);
routerBarang.route("cari").get(cariBarang);
routerBarang.route("/tambah").post(upload.single('foto'), tambahBarang);
routerBarang.route("/detail")
.get(detailBarang)
.post(loginCheck, tambahKeKeranjang)
.delete(loginCheck, hapusDariKeranjang);
routerBarang.route("/edit/:id").put(ubahDataBarang);
routerBarang.route("/hapus/:id").delete(hapusBarang);

module.exports = routerBarang;


