const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const fs = require("fs");

const {
    Akun,
    Barang,
    BarangYangDipesan,
    BuktiPembayaranPemesanan,
    Keranjang,
    Pemesanan
} = require('../database/models');

const { t } = require('./controllerPemesanan');

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
    const { id } = req.params;

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
            data: {
                pesanan: pesanan,
                statusPesanan: 'Diproses'
            }
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

const batalkanPesanan = async (req, res) => {
    const { id } = req.params;

    try {
        const pesanan = await BuktiPembayaranPemesanan.findOne({
            where: {
                pemesananId: id
            }
        },
        {
            include: Pemesanan
        });

        // delete photo from local storage
        fs.unlink(`${pesanan.buktiPembayaran}`, (err) => {
            if (err) throw 'Gagal menghapus foto dari penyimpanan lokal!';
            else console.log('Berhasil menghapus foto dari penyimpanan lokal!');
        });
        
        await t.rollback();
        await BuktiPembayaranPemesanan.destroy({
            where: {
                pemesananId: pesanan.pemesananId
            }
        });
        await pesanan.destroy();

        res
        .status(200)
        .json({
            status: 'success',
            message: 'Pesanan berhasil dibatalkan!'
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

const  ubahStatusKirim = async (req, res) => {
    const { id } = req.params;

    try {
        const pesanan = await BuktiPembayaranPemesanan.findOne({
            where: {
                pemesananId: id
            }
        },
        {
            include: Pemesanan
        });
        
        await pesanan.update({
            Pemesanan: {
                tanggalKirim: Date.now()
            }
        });

        res
        .status(200)
        .json({
            status: 'success',
            message: 'Pesanan berhasil dibatalkan!'
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
    batalkanPesanan,
    ubahStatusKirim
}