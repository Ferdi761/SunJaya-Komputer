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
  daftarSemuaPesanan,
  pesananSelesai,
  umpanBalik,
  byd,

  // ADMIN ONLY
  daftarKonfirmasiPesanan,
  konfirmasiPesanan,
  batalkanPesanan,
  ubahStatusKirim,
  konfirmasiPesananSampai
} = require('../controllers/controllerPemesanan');

routerPemesanan.route("/").get(loginCheck, daftarSemuaPesanan);
routerPemesanan.route("/checkout").post(loginCheck, checkout);
routerPemesanan.route("/checkout/upload/:id").put(loginCheck, upload.single('buktiPembayaran'), uploadBuktiBayar);
routerPemesanan.route("/selesai/:id").put(loginCheck, pesananSelesai);
routerPemesanan.route("/ulasan/:id").put(loginCheck, umpanBalik);
// check only
routerPemesanan.route("/byd/:pmsID").get(byd);


// ADMIN ONLY
routerPemesanan.route("/admin/konfirmasi").get(loginCheck, isAdmin, daftarKonfirmasiPesanan);
routerPemesanan.route("/admin/konfirmasi/:id").post(loginCheck, isAdmin, konfirmasiPesanan);
routerPemesanan.route("/admin/batalkan/:id").delete(loginCheck, isAdmin, batalkanPesanan);
routerPemesanan.route("/admin/kirim/:id").put(loginCheck, isAdmin, ubahStatusKirim);
routerPemesanan.route("/admin/sampai/:id").put(loginCheck, isAdmin, konfirmasiPesananSampai);

module.exports = routerPemesanan;