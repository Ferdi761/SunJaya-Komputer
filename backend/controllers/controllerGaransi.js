const {
    Garansi,
    Pemesanan,
    BarangYangDipesan,
    Akun
} = require('../database/models');

// FOR PELANGGAN
const ajukanGaransi = async (req, res) => {
    // const logged = req.cookies.logged_account;
    // const decoded = jwt.verify(logged, 'jwtAkunId');
    const idBarang = req.params.id;
    const {
        jumlah,
        keluhan,
        alamatTujuan,
        fotoPendukung
    } = req.body;

    try {

    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .json({
                status: 'fail',
                message: [err]
            })
            .end();
    }
}

// FOR PELANGGAN, konfirmasi barang yang telah diajukan garansi telah diganti
// dan sampai ke pelanggan
const konfirmasiSampai = async (req, res) => {
    // const logged = req.cookies.logged_account;
    // const decoded = jwt.verify(logged, 'jwtAkunId');
    const idBarang = req.params.id;
    try {

    }
    catch (err) {
        console.log(err);
        res
            .status(500)
            .json({
                status: 'fail',
                message: [err]
            })
            .end();
    }
};

// ADMIN ONLY
const konfirmasiGaransi = async (req, res) => {

};

// ADMIN ONLY
const tolakGaransi = async (req, res) => {

};

module.exports = {
    ajukanGaransi,
    konfirmasiGaransi,
    tolakGaransi,
    konfirmasiSampai,
}