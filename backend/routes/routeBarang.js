const express = require("express");
const routerBarang = express.Router();
const path = require("path");

// setup multer storage
const multer = require("multer");

destFotoBarang = path.join(__dirname, '..', 'assets', 'imgBarang');
console.log(destFotoBarang);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destFotoBarang);
    },
    filename: function (req, file, cb) {
      const namaFile = `${ Math.random() * 10 }-${ Date.now() }-${ file.originalname }`;  //Date.now() + '-' + file.originalname;
      cb(null, namaFile);
    }
  });
  
const upload = multer({ storage: storage });

const {
    daftarBarang,
    tambahBarang,
    detailBarang,
    ubahDataBarang,
    hapusBarang,
    cariBarang
} = require("../controllers/controllerBarang");

routerBarang.route("/").get(daftarBarang);
routerBarang.route("cari").get(cariBarang);
routerBarang.route("/tambah").post(upload.single('foto'), tambahBarang);
routerBarang.route("/detail").get(detailBarang);
routerBarang.route("/edit/:id").put(ubahDataBarang);
routerBarang.route("/hapus/:id").delete(hapusBarang);

module.exports = routerBarang;


