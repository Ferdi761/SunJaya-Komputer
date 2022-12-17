const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const fs = require('fs')

const {
  Akun,
  Barang,
  FotoBarang,
  BarangYangDipesan,
  BuktiPembayaranPemesanan,
  Keranjang,
  Pemesanan,
} = require('../database/models')

// array untuk data barang yang dipesan
let dataBYD = []
// setTimeout
let waktuPembayaran

const checkout = async (req, res) => {
  // const logged = req.headers.authorization.split(' ')[1]
  const logged = req.cookies.logged_account
  const decoded = jwt.verify(logged, 'jwtAkunId')

  const { alamatTujuan, jasaPengiriman, biayaPengiriman } = req.body

  try {
    const userCart = await Akun.findOne({
      where: { id: decoded.id },
      include: Barang,
    })
    if (!userCart)
      return res.status(404).json('Akun tidak ditemukan!')

    const { Barangs } = userCart

    let totalPriceItem = 0
    for (let item in Barangs) {
      totalPriceItem +=
        Barangs[item].harga * Barangs[item].Keranjang.jumlah
    }
    console.log('total price item: ' + typeof totalPriceItem)
    let totalAll = totalPriceItem + parseFloat(biayaPengiriman)
    console.log('total all: ' + typeof totalAll)
    //const today = new Date();
    const oneDay = 86400000

    const buatPesanan = await BuktiPembayaranPemesanan.create(
      {
        buktiPembayaran: null,
        Pemesanan: {
          akunId: userCart.id,
          alamatTujuan,
          jasaPengiriman,
          biayaPengiriman,
          totalHargaBarang: totalPriceItem,
          totalBiayaYangHarusDibayar: totalAll,
          pembayaranLunas: false,
          tanggalMulaiMenungguPembayaran: Date.now(),
        },
      },
      {
        include: Pemesanan,
      }
    )

    // Memasukkan data barang yang dipesan dari Barangs ke dalam array untuk sementara
    Barangs.forEach((item) => {
      dataBYD.push({
        pemesananId: buatPesanan.pemesananId,
        BarangId: item.Keranjang.BarangId,
        jumlah: item.Keranjang.jumlah,
        totalHarga: item.harga * item.Keranjang.jumlah,
      })
    })
    // console.log(dataBYD);

    // add transaction
    // t = await sequelize.transaction();
    dataBYD.forEach(async (item) => {
      await BarangYangDipesan.create(item)
      let barang = await Barang.findOne({
        where: {
          id: item.BarangId,
        },
      })

      const stokBarang = await barang.getDataValue('stok')

      let updateStok = stokBarang - item.jumlah
      if (updateStok < 0)
        return res.status(400).json('Stok barang tidak cukup!')

      await barang.update({
        stok: updateStok,
      })
    })

    await Keranjang.destroy({
      where: {
        akunId: decoded.id,
      },
    })

    waktuPembayaran = setTimeout(async () => {
      console.log('waktu habis, pemesanan dibatalkan!')

      dataBYD.forEach(async (item) => {
        let barang = await Barang.findOne({
          where: {
            id: item.BarangId,
          },
        })

        const stokBarang = await barang.getDataValue('stok')
        let updateStok = stokBarang + item.jumlah

        await barang.update({
          stok: updateStok,
        })

        await BarangYangDipesan.destroy({
          where: {
            pemesananId: item.pemesananId,
            BarangId: item.BarangId,
          },
        })
      })

      await buatPesanan.destroy()

      // set ulang array menjadi nol
      dataBYD = []
    }, 50000)

    res
      .status(200)
      .json({
        status: 'success',
        message:
          'Pesanan telah dibuat, menunggu pembayaran hingga 24 jam kedepan!',
        data: {
          Keranjang: userCart,
          Pesanan: buatPesanan,
          totalHarga: totalPriceItem,
          statusPesanan: 'Bayar',
        },
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: [err],
      })
      .end()
  }
}

const uploadBuktiBayar = async (req, res) => {
  const logged = req.cookies.logged_account
  // decode cookie's token from jwt to get the id of Akun
  const decoded = jwt.verify(logged, 'jwtAkunId')
  const { id } = req.params
  let imagePath = req.file.path

  try {
    const userCart = await Akun.findOne({
      where: { id: decoded.id },
      include: Barang,
    })
    if (!userCart)
      return res.status(404).json('Akun tidak ditemukan!')

    const buktiBayar = await BuktiPembayaranPemesanan.findOne(
      {
        where: {
          pemesananId: id,
        },
      },
      {
        include: Pemesanan,
      }
    )

    await buktiBayar.update({
      buktiPembayaran: imagePath,
    })
    await Keranjang.destroy({
      where: {
        akunId: decoded.id,
      },
    })

    clearTimeout(waktuPembayaran)

    res
      .status(200)
      .json({
        status: 'success',
        message: 'Berhasil mengupload bukti pembayaran!',
        statusPesanan: ['Semua', 'Menunggu konfirmasi'],
        data: buktiBayar,
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: [err],
      })
      .end()
  }
}

const pesananSelesai = async (req, res) => {
  const logged = req.cookies.logged_account
  const decoded = jwt.verify(logged, 'jwtAkunId')
  const idPesanan = req.params.id

  try {
    const pesanan = await Pemesanan.findOne({
      include: BarangYangDipesan,
      where: {
        [Op.and]: [
          { id: idPesanan },
          { akunId: decoded.id },
          { tanggalSampai: { [Op.not]: null } }
        ]
      }
    })

    if (!pesanan) throw 'Pesanan tidak ditemukan!'

    // pesanan.update({

    // })

    res
    .status(200)
    .json({
      status: 'success',
      data: pesanan
    })
    .end()
  } 
  catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: [err],
      })
      .end()
  }
}

const umpanBalik = async (req, res) => {
  const { id } = req.params
  const { rating, testimoni } = req.body

  try {
    const pesanan = await BuktiPembayaranPemesanan.findOne(
      {
        where: {
          pemesananId: id,
        },
      },
      {
        include: Pemesanan,
      }
    )

    await pesanan.update({
      Pemesanan: {
        rating: parseFloat(rating),
        testimoni: testimoni,
      },
    })

    res.status(200).json({
      status: 'success',
      message: 'Berhasil menambahkan ulasan!',
      data: {
        pesanan: pesanan,
        statusPesanan: ['Semua', 'Selesai'],
      },
    })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: [err],
      })
      .end()
  }
}

// untuk testing
const byd = async (req, res) => {
  const logged = req.cookies.logged_account
  const decoded = jwt.verify(logged, 'jwtAkunId')
  const { pmsID } = req.params

  try {
    const BYD = await BarangYangDipesan.findAll({
      where: {
        pemesananId: pmsID,
      },
    })

    res
      .status(200)
      .json({
        status: 'success',
        data: BYD,
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: [err],
      })
      .end()
  }
}

// ADMIN ONLY

// Lihat pesanan yang belum dikonfirmasi tetapi sudah dibayar pelanggan
const daftarKonfirmasiPesanan = async (req, res) => {
  try {
    const waitForConfirm = await BuktiPembayaranPemesanan.findAll({
      where: {
        buktiPembayaran: {
          [Op.not]: null,
        },
      },
      include: {
        model: Pemesanan,
        where: {
          pembayaranLunas: false,
        },
      },
    })

    res
      .status(200)
      .json({
        status: 'success',
        data: waitForConfirm,
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: [err],
      })
      .end()
  }
}

// konfirmasi pesanan pelanggan
const konfirmasiPesanan = async (req, res) => {
  const { id } = req.params

  try {
    const pesanan = await BuktiPembayaranPemesanan.findOne({
      where: {
        pemesananId: id,
      },
      include: Pemesanan,
    })

    await pesanan['Pemesanan'].update({
      pembayaranLunas: true,
    })
    await pesanan.save()

    res
      .status(200)
      .json({
        status: 'success',
        message: 'Pembayaran berhasil dikonfirmasi!',
        data: {
          pesanan: pesanan,
          statusPesanan: 'Diproses',
        },
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: [err],
      })
      .end()
  }
}

// Membatalkan pesanan pelanggan
const batalkanPesanan = async (req, res) => {
  const { id } = req.params

  try {
    const pesanan = await BuktiPembayaranPemesanan.findOne(
      {
        where: {
          pemesananId: id,
        },
      },
      {
        include: Pemesanan,
      }
    )

    // delete photo from local storage
    fs.unlink(`${pesanan.buktiPembayaran}`, (err) => {
      if (err)
        return res.status(500).json({ status: 'fail', message: err })
      else
        console.log('Berhasil menghapus foto dari penyimpanan lokal!')
    })

    // -----------------------------
    // hapus dari db
    dataBYD.forEach(async (item) => {
      let barang = await Barang.findOne({
        where: {
          id: item.BarangId,
        },
      })

      const stokBarang = await barang.getDataValue('stok')
      let updateStok = stokBarang + item.jumlah

      await barang.update({
        stok: updateStok,
      })

      await BarangYangDipesan.destroy({
        where: {
          pemesananId: item.pemesananId,
          BarangId: item.BarangId,
        },
      })
    })

    await pesanan.destroy()
    dataBYD = []
    // --------------------------------

    res
      .status(200)
      .json({
        status: 'success',
        message: 'Pesanan berhasil dibatalkan!',
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: [err],
      })
      .end()
  }
}

// Mengubah status pesanan menjadi dikirim
const ubahStatusKirim = async (req, res) => {
  const { id } = req.params

  try {
    const pesanan = await Pemesanan.findOne({
      where: {
        id: id,
        pembayaranLunas: true
      }
    })

    const aWeek = 604800000
    const today = new Date()

    await pesanan.update({
      tanggalKirim: Date.now()
    })
    await pesanan.save()

    const thisDate = pesanan.tanggalKirim
    const aDay = new Date(thisDate.getTime() + aWeek)

    console.log(pesanan.tanggalKirim)
    console.log(pesanan.tanggalKirim.getHours())
    console.log(pesanan.tanggalKirim.getHours() + 2)
    console.log(thisDate.toLocaleString())
    console.log(thisDate.valueOf() === aDay.valueOf())
    // console.log((thisDate + (thisDate.getHours() + 2)).toLocaleString());
    console.log(aDay.toLocaleString())
    // console.log(Date.now());
    // console.log( + 240000);

    res
      .status(200)
      .json({
        status: 'success',
        message: 'Pesanan sedang dikirim!',
        statusPesanan: ['Semua, Dikirim'],
        data: pesanan,
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: [err],
      })
      .end()
  }
}

// Admin konfirmasi pesanan sudah sampai ke alamat pelanggan
const konfirmasiPesananSampai = async (req, res) => {
  const { id } = req.params

  try {
    const pesanan = await Pemesanan.findOne(
      {
        where: {
          id: id,
          tanggalKirim: {
            [Op.not]: null
          }
        },
      }
    )

    pesanan.update({
      tanggalSampai: Date.now()
    })

    res
    .status(200)
    .json({
      status: 'success',
      message: 'Pesanan Telah sampai ke pelanggan!',
      data: pesanan
    })
    .end()
  } 
  catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: [err],
      })
      .end()
  }
}

// lihat pesanan berdasarkan status pesanan (untuk pelanggan)

// Pesanan dengan semua status
const daftarSemuaPesanan = async (req, res) => {
  // const logged = req.headers.authorization.split(' ')[1]
  const logged = req.cookies.logged_account
  const decoded = jwt.verify(logged, 'jwtAkunId')

  try {
    const listPesanan = await Pemesanan.findAll(
      {
        include: [
          {
            model: Barang,
            include: FotoBarang
          }
        ],
      },
      {
        where: { akunId: decoded.id }
      }
    )

    //console.log(listPesanan.Pemesanan.);
    res
      .status(200)
      .json({
        status: 'success',
        data: {
          statusPesanan: ['Semua'],
          pesanan: listPesanan,
        },
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: [err],
      })
      .end()
  }
}

// Pesanan belum dibayar
const pesananBelumBayar = async (req, res) => {
  const logged = req.cookies.logged_account
  const decoded = jwt.verify(logged, 'jwtAkunId')

  try {
    const listPesanan = await BuktiPembayaranPemesanan.findAll(
      {
        where: {
          buktiPembayaran: {
            [Op.is]: null,
          },
          Pemesanan: {
            akunId: decoded.id,
          },
        },
      },
      {
        include: Pemesanan,
      }
    )

    res
      .status(200)
      .json({
        status: 'success',
        message: 'Menunggu pembayaran pesanan!',
        data: {
          statusPesanan: ['Semua', 'Belum_Bayar'],
          pesanan: listPesanan,
        },
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: [err],
      })
      .end()
  }
}

// Pesanan diproses
const pesananDiproses = async (req, res) => {
  const logged = req.cookies.logged_account
  const decoded = jwt.verify(logged, 'jwtAkunId')

  try {
    const listPesanan = await BuktiPembayaranPemesanan.findAll(
      {
        where: {
          buktiPembayaran: {
            [Op.not]: null,
          },
          Pemesanan: {
            akunId: decoded.id,
            pembayaranLunas: {
              [Op.is]: true,
            },
            tanggalKirim: {
              [Op.is]: null,
            },
          },
        },
      },
      {
        include: Pemesanan,
      }
    )

    res
      .status(200)
      .json({
        status: 'success',
        message: 'Menunggu pembayaran pesanan!',
        data: {
          statusPesanan: ['Semua', 'Belum_Bayar'],
          pesanan: listPesanan,
        },
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: [err],
      })
      .end()
  }
}

// Pesanan dikirim
const pesananDikirim = async (req, res) => {
  const logged = req.cookies.logged_account
  const decoded = jwt.verify(logged, 'jwtAkunId')

  try {
    const listPesanan = await BuktiPembayaranPemesanan.findAll(
      {
        where: {
          buktiPembayaran: {
            [Op.not]: null,
          },
          Pemesanan: {
            akunId: decoded.id,
            pembayaranLunas: {
              [Op.is]: true,
            },
            tanggalKirim: {
              [Op.not]: null,
            },
          },
        },
      },
      {
        include: Pemesanan,
      }
    )

    res
      .status(200)
      .json({
        status: 'success',
        message: 'Pesanan sedang dikirim!',
        data: {
          statusPesanan: ['Semua', 'Dikirim'],
          pesanan: listPesanan,
        },
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: [err],
      })
      .end()
  }
}

module.exports = {
  checkout,
  uploadBuktiBayar,
  pesananSelesai,
  umpanBalik,
  byd, // testing barang yang dipesan

  // ADMIN ONLY
  daftarKonfirmasiPesanan,
  konfirmasiPesanan,
  batalkanPesanan,
  ubahStatusKirim,
  konfirmasiPesananSampai,

  // tampilan pesanan untuk pelanggan
  daftarSemuaPesanan,
  pesananBelumBayar,
  pesananDiproses,
  pesananDikirim,
}
