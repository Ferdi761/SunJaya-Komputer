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
        // const barangYangDipesan = await BarangYangDipesan.create({

        // });

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
                biayaPengiriman,
                // Barang: [],
                totalHargaBarang: totalPriceItem,
                totalBiayaYangHarusDibayar: totalAll,
                pembayaranLunas: false,
                tanggalMulaiMenungguPembayaran: Date.now(),
            }
        }, {
            include: Pemesanan
        });

        // Memasukkan data barang yang dipesan dari Barangs ke dalam array untuk sementara
        let dataBYD = [];
        Barangs.forEach((item) => {
            dataBYD.push({
                pemesananId: buatPesanan.pemesananId,
                BarangId: item.Keranjang.BarangId,
                jumlah: item.Keranjang.jumlah,
                totalHarga: item.harga * item.Keranjang.jumlah
            });
        });
        console.log(dataBYD);

        // memasukkan data array ke tabel BarangYangDipesan
        await BarangYangDipesan.bulkCreate(dataBYD);

        waktuPembayaran = setTimeout(async() => {
            console.log("waktu habis, pemesanan dibatalkan!");
            await BuktiPembayaranPemesanan.destroy({
                where: {
                    Pemesanan: {
                        id: buatPesanan.pemesananId,
                        akunId: userCart.id,
                    }
                }
            });
            // await BarangYangDipesan.destroy({

            // });
            // await Keranjang.destroy({
            //     where: {
            //         akunId: decoded.id
            //     }
            // });
            // set ulang array menjadi nol
            dataBYD = [];
        }, 20000);
        
        res.status(200).json({
            status: "success",
            message: 'Pesanan telah dibuat, menunggu pembayaran hingga 24 jam kedepan!',
            data: {
                Keranjang: userCart,
                Pesanan: buatPesanan,
                totalHarga: totalPriceItem,
                statusPesanan: 'Bayar',
            }
        }).end();

    }
    catch(err) {
        console.log(err);
        res.status(500).json({ msg: err }).end();
    }
};

 const pesananBelumBayar = async (req, res) => {
    const logged = req.cookies.logged_account;
    const decoded = jwt.verify(logged, 'jwtAkunId');

    try {
        
    }
    catch (err) {

    }
 };

const uploadBuktiBayar = async (req, res) => {
    const logged = req.cookies.logged_account;
    // decode cookie's token from jwt to get the id of Akun
    const decoded = jwt.verify(logged, 'jwtAkunId');
    const { id } = req.params;
    let imagePath = req.file.path;

    try {
        const userCart = await Akun.findOne({
            where: { id: decoded.id },
            include: Barang
        });
        if (!userCart) throw 'Pengguna tidak ditemukan!';

        const buktiBayar = await BuktiPembayaranPemesanan.findOne({
            where: {
                pemesananId: id
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
            statusPesanan: ['Semua', 'Menunggu konfirmasi'],
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
            include: Pemesanan
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
            data: {
                pesanan: listPesanan,
                statusPesanan: 'Semua'
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

const umpanBalik = async (req, res) => {
    const { id } = req.params;
    const {
        rating,
        testimoni
    } = req.body;

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
                rating: parseFloat(rating),
                testimoni: testimoni
            }
        });

        res
        .status(200)
        .json({
            status: 'success',
            message: 'Berhasil menambahkan ulasan!',
            data: {
                pesanan: pesanan,
                statusPesanan: 'Selesai'
            }
        })
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

// const byd = async (req, res) => {

// };

module.exports = {
    checkout,
    pesananBelumBayar,
    uploadBuktiBayar,
    daftarSemuaPesanan,
    umpanBalik,
    // byd // testing barang yang dipesan
};
