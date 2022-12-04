const jwt = require("jsonwebtoken");

const {
    Akun,
    Barang,
    BarangYangDipesan,
    BuktiPembayaranPemesanan,
    Keranjang,
    Pemesanan
} = require('../database/models');

var waktuPembayaran;

const checkout = async (req, res) => {
    const logged = req.cookies.logged_account;
    // decode cookie's token from jwt to get the id of Akun
    const decoded = jwt.verify(logged, 'jwtAkunId');

    const {
        alamatTujuan,
        jasaPengiriman,
        biayaPengiriman,
        } = req.body;

    try {
        const userCart = await Akun.findOne({
            where: { id: decoded.id },
            include: Barang
        });
        if (!userCart) throw 'Pengguna tidak ditemukan!';
        
        const { Barangs } = userCart;

        let totalPriceItem = 0;
        for(let item in Barangs) {
            totalPriceItem += Barangs[item].harga * Barangs[item].Keranjang.jumlah;
        }
        console.log('total price item: ' + typeof(totalPriceItem));
        let totalAll = totalPriceItem + parseFloat(biayaPengiriman);
        console.log('total all: ' + typeof(totalAll));
        //const today = new Date();
        const oneDay = 86400000;

        const buatPesanan = await BuktiPembayaranPemesanan.create({
            buktiPembayaran: null,
            Pemesanan: {
                akunId: userCart.id,
                alamatTujuan,
                jasaPengiriman,
                totalHargaBarang: totalPriceItem,
                biayaPengiriman,
                totalBiayaYangHarusDibayar: totalAll,
                pembayaranLunas: false,
                tanggalMulaiMenungguPembayaran: Date.now(),
            }
        }, {
            include: Pemesanan
        });

        waktuPembayaran = setTimeout(async() => {
            console.log("waktu habis, pemesanan dibatalkan!");
            await buatPesanan.destroy();
        }, 20000);
        
        res.status(200).json({
            status: "success",
            message: 'Pesanan telah dibuat, menunggu pembayaran hingga 24 jam kedepan!',
            data: {
                userCart,
                buatPesanan,
                totalHarga: totalPriceItem,
                statusPesanan: 'Bayar'
            }
        }).end();

    }
    catch(err) {
        console.log(err);
        res.status(500).json({ msg: err }).end();
    }
};

const uploadBuktiBayar = async (req, res) => {
    const logged = req.cookies.logged_account;
    // decode cookie's token from jwt to get the id of Akun
    const decoded = jwt.verify(logged, 'jwtAkunId');
    const { pemesananId } = req.query;
    let imagePath = req.file.path;

    try {
        const userCart = await Akun.findOne({
            where: { id: decoded.id },
            include: Barang
        });
        if (!userCart) throw 'Pengguna tidak ditemukan!';

        const buktiBayar = await BuktiPembayaranPemesanan.findOne({
            where: {
                pemesananId: pemesananId
            }
        },
        {
            include: Pemesanan
        });

        await buktiBayar.update({
            buktiPembayaran: imagePath
        });

        res
        .status(200)
        .json({
            status: 'success',
            message: 'Berhasil mengupload bukti pembayaran!',
            statusPesanan: 'Menunggu konfirmasi',
            data: buktiBayar
        })
        .end();
    }
    catch(err) {
        console.log(err);
        res
        .status(500)
        .json({
            status: 'fail',
            message: [err]
        })
        .end();
    }
    clearTimeout(waktuPembayaran);
};

const daftarSemuaPesanan = async (req, res) => {
    const logged = req.cookies.logged_account;
    // decode cookie's token from jwt to get the id of Akun
    const decoded = jwt.verify(logged, 'jwtAkunId');

    try {
        const listPesanan = await BuktiPembayaranPemesanan.findAll({
            include: Pemesanan,
        },
        {
            where: {
                Pemesanan: {
                    akunId: decoded.id
                }
            }
        });

        console.log(listPesanan);
        res
        .status(200)
        .json({
            status: 'success',
            data: listPesanan
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
    checkout,
    uploadBuktiBayar,
    daftarSemuaPesanan
};
