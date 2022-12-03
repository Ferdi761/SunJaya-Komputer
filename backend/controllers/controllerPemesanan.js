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
        let totalAll = totalPriceItem + parseFloat(biayaPengiriman);
        //const today = new Date();
        const oneDay = 86400000;

        const buatPesanan = await BuktiPembayaranPemesanan.create({
            buktiPembayaran: '',
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
            data: { userCart, buatPesanan, totalHarga: totalPriceItem }
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
    const imagePath = req.file.path;

    try {
        const userCart = await Akun.findOne({
            where: { id: decoded.id },
            include: Barang
        });
        if (!userCart) throw 'Pengguna tidak ditemukan!';

        const uploadBukti = await BuktiPembayaranPemesanan.update({
            buktiPembayaran: imagePath
        },
        {
            where: { pemesananId: pemesananId }
        });

        res
        .status(200)
        .json({
            status: 'success',
            message: 'Berhasil mengupload bukti pembayaran!',
            data: uploadBukti
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

module.exports = {checkout, uploadBuktiBayar};
