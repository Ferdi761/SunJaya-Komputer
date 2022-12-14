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
  const logged = req.headers.authorization.split(' ')[1]
  // const logged = req.cookies.logged_account
  const decoded = jwt.verify(logged, 'jwtAkunId')

  const { alamatTujuan } = req.body

  try {
    const userCart = await Akun.findOne({
      where: { id: decoded.id },
      include: Barang,
    })
    if (!userCart)
      return res.status(404).json('Akun tidak ditemukan!')

    console.log(userCart)
    const { Barangs } = userCart

    let totalPriceItem = 0
    for (let item in Barangs) {
      totalPriceItem +=
        Barangs[item].harga * Barangs[item].Keranjang.jumlah
    }
    console.log(Barangs)
    console.log('total price item: ' + typeof totalPriceItem)
    // console.log('total all: ' + typeof totalAll)
    //const today = new Date();
    const oneDay = 86400000

    const buatPesanan = await Pemesanan.create({
      akunId: userCart.id,
      alamatTujuan,
      totalHargaBarang: totalPriceItem,
      status: 1,
    })

    console.log(buatPesanan)

    await BuktiPembayaranPemesanan.create(
      {
        pemesananId: buatPesanan.id,
        buktiPembayaran: '',
      },
      {
        include: Pemesanan,
      }
    )

    // Memasukkan data barang yang dipesan dari Barangs ke dalam array untuk sementara
    Barangs.forEach((item) => {
      dataBYD.push({
        pemesananId: buatPesanan.id,
        BarangId: item.Keranjang.BarangId,
        jumlah: item.Keranjang.jumlah,
        totalHarga: item.harga * item.Keranjang.jumlah,
      })
    })

    dataBYD.forEach(async (item) => {
      await BarangYangDipesan.create(item)
      const barang = await Barang.findOne({
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

    res
      .status(200)
      .json({
        status: 'success',
        message:
          'Pesanan telah dibuat, menunggu konfirmasi dari admin!',
        idPemesanan: buatPesanan.id,
        data: buatPesanan,
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
  const logged = req.headers.authorization.split(' ')[1]
  // const logged = req.cookies.logged_account
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
      return res.status(404).json('Akun tidak ditemukan!').end()

    const buktiBayar = await BuktiPembayaranPemesanan.findOne({
      where: { pemesananId: id },
    })

    if (!buktiBayar)
      return res.status(404).json('Pemesanan tidak ditemukan!').end()

    buktiBayar.update({
      buktiPembayaran: imagePath,
    })
    clearTimeout(waktuPembayaran)

    res
      .status(200)
      .json({
        status: 'success',
        message: 'Berhasil mengupload bukti pembayaran!',
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
  // const logged = req.cookies.logged_account\
  const logged = req.headers.authorization.split(' ')[1]
  const decoded = jwt.verify(logged, 'jwtAkunId')
  const idPesanan = req.params.id

  try {
    const pesanan = await Pemesanan.findOne({
      include: BarangYangDipesan,
      where: {
        [Op.and]: [
          { id: idPesanan },
          { akunId: decoded.id },
          { tanggalSampai: { [Op.not]: null } },
        ],
      },
    })
    if (!pesanan)
      return res
        .status(404)
        .json({ message: 'Pemesanan tidak ditemukan' })
        .end()

    await pesanan.update({
      status: 5,
    })

    res
      .status(200)
      .json({
        status: 'success',
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

const umpanBalik = async (req, res) => {
  const { id } = req.params
  const { rating, testimoni } = req.body

  try {
    const pesanan = await Pemesanan.findOne({
      where: {
        id,
      },
    })

    await pesanan.update({
      rating: parseInt(rating),
      testimoni: testimoni,
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

// Daftar semua pesanan pelanggan
const semuaPesananPelanggan = async (req, res) => {
  try {
    const listPesanan = await Pemesanan.findAll({
      include: [
        {
          model: Barang,
          include: {
            model: FotoBarang,
            required: true,
          },
        },
        {
          model: Akun,
          attributes: ['id', 'nama'],
        },
      ],
    })

    res
      .status(200)
      .json({
        status: 'success',
        data: listPesanan,
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: err,
      })
      .end()
  }
}

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

// Admin konfirmasi pesanan pelanggan
const konfirmasiPesanan = async (req, res) => {
  const { id } = req.params
  const { biayaPengiriman, jasaPengiriman } = req.body
  // for test time
  // let timeOut = new Date()
  // const aDay = timeOut.getTime() + 10000

  try {
    const pesanan = await Pemesanan.findOne({ where: { id } })

    await pesanan.update({
      status: 2,
      biayaPengiriman,
      jasaPengiriman,
      totalBiayaYangHarusDibayar:
        pesanan.totalHargaBarang + parseInt(biayaPengiriman),
      tanggalMulaiMenungguPembayaran: Date.now(),
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

        // set ulang jumlah barang
        await barang.update({
          stok: updateStok,
        })

        // hapus daftar barang yang dipesan
        await BarangYangDipesan.destroy({
          where: {
            pemesananId: item.pemesananId,
            BarangId: item.BarangId,
          },
        })
      })

      // hapus pesanan
      await pesanan.destroy()

      // set ulang array menjadi nol
      dataBYD = []

      console.log('Waktu habis, pemesanan dibatalkan!')
    }, 86400000)

    res
      .json({
        status: 'success',
        message:
          'Pemesanan telah dikonfirmasi, menunggu pembayaran 24 jam kedepan!',
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

const pengirimanPesanan = async (req, res) => {
  const { id } = req.params
  const { jasaPengiriman, biayaPengiriman } = req.body

  try {
    const pesanan = await Pemesanan.findOne({ where: { id } })

    await pesanan.update({
      jasaPengiriman,
      biayaPengiriman,
    })

    res
      .json({
        status: 'success',
        message: 'Pengiriman telah ditentukan!',
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
    const pesanan = await Pemesanan.findOne({
      where: { id },
      include: {
        model: BuktiPembayaranPemesanan,
      },
    })

    console.log(pesanan)

    // delete photo from local storage
    fs.unlink(`${pesanan.buktiPembayaran}`, (err) => {
      if (err)
        console.log(
          'Gagal menghapus foto dari penyimpanan lokal, mungkin foto tidak ada!'
        )
      else
        console.log('Berhasil menghapus foto dari penyimpanan lokal!')
    })

    // -----------------------------
    // hapus dari db
    // dataBYD.forEach(async (item) => {
    //   let barang = await Barang.findOne({
    //     where: {
    //       id: item.BarangId,
    //     },
    //   })

    //   const stokBarang = await barang.getDataValue('stok')
    //   let updateStok = stokBarang + item.jumlah

    //   await barang.update({
    //     stok: updateStok,
    //   })

    //   await BarangYangDipesan.destroy({
    //     where: {
    //       pemesananId: item.pemesananId,
    //       BarangId: item.BarangId,
    //     },
    //   })
    // })

    // await pesanan.destroy()
    // dataBYD = []
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

const ubahStatusDiproses = async (req, res) => {
  const { id } = req.params

  try {
    const pesanan = await Pemesanan.findOne({
      where: {
        id,
      },
    })

    await pesanan.update({
      status: 3,
      pembayaranLunas: true,
    })
    await pesanan.save()

    res
      .json({
        status: 'success',
        message: 'Status pesanan telah diubah!',
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
        pembayaranLunas: true,
      },
    })

    const aWeek = 604800000
    const today = new Date()

    await pesanan.update({
      status: 4,
      tanggalKirim: Date.now(),
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
    const pesanan = await Pemesanan.findOne({
      where: {
        id: id,
        tanggalKirim: {
          [Op.not]: null,
        },
      },
    })

    pesanan.update({
      status: 5,
      tanggalSampai: Date.now(),
    })

    res
      .status(200)
      .json({
        status: 'success',
        message: 'Pesanan Telah sampai ke pelanggan!',
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

// lihat pesanan berdasarkan status pesanan (untuk pelanggan)

// Pesanan dengan semua status
const daftarSemuaPesanan = async (req, res) => {
  const logged = req.headers.authorization.split(' ')[1]
  // const logged = req.cookies.logged_account
  const decoded = jwt.verify(logged, 'jwtAkunId')

  try {
    const listPesanan = await Pemesanan.findAll({
      where: { akunId: decoded.id },
      include: [
        {
          model: Barang,
          include: FotoBarang,
        },
        {
          model: Akun,
          attributes: ['id', 'nama'],
        },
      ],
    })

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

const detailPesanan = async (req, res) => {
  const logged = req.headers.authorization.split(' ')[1]
  // const logged = req.cookies.logged_account
  const decoded = jwt.verify(logged, 'jwtAkunId')
  const { id } = req.params

  try {
    const pesanan = await Pemesanan.findOne({
      include: [
        {
          model: Barang,
          include: FotoBarang,
        },
        {
          model: Akun,
          attributes: ['id', 'nama'],
        },
      ],
      where: {
        [Op.and]: [
          {
            id: id,
          },
        ],
      },
    })

    const buktiPembayaran = await BuktiPembayaranPemesanan.findOne({
      where: {
        pemesananId: id,
      },
    })

    res.status(200).json({
      status: 'success',
      data: {
        buktiPembayaran: buktiPembayaran,
        pesanan: pesanan,
      },
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: 'fail',
      message: [err],
    })
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
  detailPesanan,
  uploadBuktiBayar,
  pesananSelesai,
  umpanBalik,
  byd, // testing barang yang dipesan

  // ADMIN ONLY
  semuaPesananPelanggan,
  daftarKonfirmasiPesanan,
  konfirmasiPesanan,
  batalkanPesanan,
  ubahStatusDiproses,
  ubahStatusKirim,
  konfirmasiPesananSampai,
  pengirimanPesanan,

  // tampilan pesanan untuk pelanggan
  daftarSemuaPesanan,
  pesananBelumBayar,
  pesananDiproses,
  pesananDikirim,
}
