const express = require("express");
const routerPemesanan = express.Router();
const path = require("path");

// setup multer storage
const multer = require("multer");

destBuktiBayar = path.join(__dirname, '../../frontend/src/assets/img/bukti-bayar');
// console.log(destBuktiBayar);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destBuktiBayar);
    },
    filename: (req, file, cb) => {
      const namaFile = `${Date.now()}-${file.originalname}`;
      cb(null, namaFile);
    }
  });
  
const upload = multer({ storage: storage });

const loginCheck = require('../middlewares/loginCheck');
const isAdmin = require('../middlewares/isAdmin');
const {
   checkout,
   uploadBuktiBayar,
   daftarSemuaPesanan
} = require("../controllers/controllerPemesanan");

const {
  daftarKonfirmasiPesanan,
  konfirmasiPesanan
} = require("../controllers/controllerPemesananAdmin");

routerPemesanan.route("/").get(loginCheck, daftarSemuaPesanan);
routerPemesanan.route("/checkout").post(loginCheck, checkout);
routerPemesanan.route("/checkout/upload").post(loginCheck,upload.single('buktiPembayaran'), uploadBuktiBayar);

// admin
routerPemesanan.route("/admin/konfirmasi").get(loginCheck, isAdmin, daftarKonfirmasiPesanan);
routerPemesanan.route("/admin/konfirmasi").post(loginCheck, isAdmin, konfirmasiPesanan);

module.exports = routerPemesanan;