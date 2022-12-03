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
const {
   checkout,
   uploadBuktiBayar
} = require("../controllers/controllerPemesanan");

routerPemesanan.route("/checkout").post(loginCheck, checkout);
routerPemesanan.route("/checkout/upload").post(loginCheck,upload.single('buktiPembayaran'), uploadBuktiBayar);

module.exports = routerPemesanan;