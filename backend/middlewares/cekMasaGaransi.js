const {
    BarangYangDipesan,
    Pemesanan
} = require('../database/models');

const { Op } = require("sequelize");

const cekMasaGaransi = async (req, res, next) => {
    const idBarang = req.params.id;

    try {
        const pesanan = await BarangYangDipesan.findOne({
            where: {
                BarangId: idBarang,
                Pemesanan: {
                    tanggalSampai: {
                        [Op.not]: null
                    }
                }
            }
        },
        {
            include: [Barang, Pemesanan]
        });

        // let tglSampai = pesanan.Pemesanan.tanggalSampai;
        // let aWeek = 

    }
    catch (err) {

    }
};