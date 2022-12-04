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
            include: Pemesanan
        },
        {
            where: {
                buktiPembayaran: {
                    [Op.not]: null
                }
            }
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
            include: Pemesanan
        },
        {
            where: {
                Pemesanan: {
                    id: id
                }
            }
        });

        const confirm = await pesanan.update({
            Pemesanan: {
                pembayaranLunas: true
            }
        });

        res
        .status(200)
        .json({
            status: 'success',
            message: 'Pembayaran berhasil dikonfirmasi!'
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