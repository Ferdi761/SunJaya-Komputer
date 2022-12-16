const {
    BarangYangDipesan,
    Pemesanan,
    Barang
} = require('../database/models');

const { Op } = require("sequelize");

const cekMasaGaransi = async (req, res, next) => {
    const idBarang = req.params.id;

    try {
        const pesanan = await Barang.findOne({
            include: [{
                model: Pemesanan,
                where: {
                    tanggalSampai: {
                        [Op.not]: null
                    }
                }
            }],
            where: {
                id: idBarang
            }
        });

        console.lg(pesanan);

        // const { tglSampai } = pesanan.Pemesanan;
        // const aWeek = 604800000;


        next();
    }
    catch (err) {
        console.log(err)
        res
            .status(500)
            .json({
                status: 'fail',
                message: err
            })
            .end()
    }
};

module.exports = cekMasaGaransi;