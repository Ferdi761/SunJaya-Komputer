const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const {
    Akun,
    Barang,
    BarangYangDipesan,
    BuktiPembayaranPemesanan,
    Keranjang,
    Pemesanan
} = require('../database/models');

const daftarKonfirmasiPesanan = async (req, res) => {
    try {
        const waitForConfirm = await BuktiPembayaranPemesanan.findAll({
            where: {
                buktiPembayaran: {
                    [Op.not]: null
                }   
            },
            include: {
                model: Pemesanan,
                where: {
                    pembayaranLunas: false
                }
            },
        });

        res
        .status(200)
        .json({
            status: 'success',
            data: waitForConfirm
        }).end();
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

const konfirmasiPesanan = async (req, res) => {
    const { id } = req.query;

    try {
        const pesanan = await BuktiPembayaranPemesanan.findOne({
            where: {
                pemesananId: id
            },
            include: Pemesanan
        });

        await pesanan['Pemesanan'].update({
                pembayaranLunas: true
        });
        await pesanan.save();

        res
        .status(200)
        .json({
            status: 'success',
            message: 'Pembayaran berhasil dikonfirmasi!',
            data: pesanan
        })
        .end();
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

module.exports = {
    daftarKonfirmasiPesanan,
    konfirmasiPesanan,
}