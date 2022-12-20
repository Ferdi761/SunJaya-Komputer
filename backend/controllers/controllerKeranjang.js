const {
  Keranjang,
  Akun,
  Barang,
  FotoBarang,
} = require('../database/models')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

// melihat semua daftar keranjang (untuk testing)
const allCartList = async (req, res) => {
  try {
    const cartList = await Keranjang.findAll()
    console.log(cartList)
    res.status(200).json(cartList).end()
  } catch (err) {
    console.log(err)
    res.status(500).json(err).end()
  }
}

// daftar barang pelanggan di keranjang
const daftarKeranjang = async (req, res) => {
  const logged = req.headers.authorization.split(' ')[1]
  // const logged = req.cookies.logged_account
  // decode cookie's token from jwt to get the id of Akun
  const decoded = jwt.verify(logged, 'jwtAkunId')

  try {
    const akun = await Akun.findOne({
      where: { id: decoded.id },
    })
    if (!akun)
      return res
        .status(404)
        .json({ message: 'Akun tidak ditemukan!' })

    // const daftarBarang = await FotoBarang.findAll({
    //     include: {
    //         model: Barang,
    //         include: {
    //             model: Keranjang,
    //             where: {
    //                 akunId: decoded.id,
    //                 BarangId: {
    //                     [Op.not]: null
    //                 }
    //             }
    //         }
    //     },
    // })

    const daftarBarang = await Keranjang.findAll({
      include: {
        model: Barang,
        include: {
          model: FotoBarang,
        },
      },
      where: {
        akunId: decoded.id,
        BarangId: {
          [Op.not]: null,
        },
      },
    })

    let totalPrice = 0
    for (let item in daftarBarang) {
      totalPrice +=
        daftarBarang[item].Barang.harga * daftarBarang[item].jumlah
    }

    res
      .status(200)
      .json({
        status: 'success',
        data: {
          daftarBarang,
          totalHarga: totalPrice,
        },
      })
      .end()
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err }).end()
  }
}

// add item into shopping cart (for customers)
const tambahKeKeranjang = async (req, res) => {
  const logged = req.headers.authorization.split(' ')[1]
  // const logged = req.cookies.logged_account
  const idBarang = req.params.id
  const decoded = jwt.verify(logged, 'jwtAkunId')

  let jumlah = 1

  try {
    const user = await Akun.findByPk(decoded.id)
    if (!user)
      res.status(404).json({ message: 'Akun tidak ditemukan!' }).end()

    const barang = await Barang.findByPk(idBarang)
    if (!barang)
      return res
        .status(404)
        .json({ message: 'Barang tidak ditemukan!' })

    // if (findCart) {
    //     const currJumlah = findCart.getDataValue('jumlah');

    //     findCart.update({
    //         jumlah: currJumlah + parseInt(jumlah)
    //     });

    const findCart = await Keranjang.findOne({
      where: {
        [Op.and]: [{ BarangId: barang.id }, { akunId: user.id }],
      },
    })

    if (findCart) {
      const currJumlah = findCart.getDataValue('jumlah')

      console.log(currJumlah)
      findCart.update({
        jumlah: currJumlah + jumlah,
      })

      res
        .status(200)
        .json({
          status: 'success',
          data: findCart,
        })
        .end()
      return
    }

    const addToCart = await Keranjang.create({
      BarangId: idBarang,
      akunId: decoded.id,
      jumlah: 1,
    })

    res
      .status(200)
      .json({
        status: 'success',
        data: addToCart,
      })
      .end()
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err }).end()
  }
}

// delete item from shopping cart
const hapusDariKeranjang = async (req, res) => {
  const logged = req.headers.authorization.split(' ')[1]
  // const logged = req.cookies.logged_account
  const decoded = jwt.verify(logged, 'jwtAkunId')
  const { id } = req.params
  // const { barangId } = req.body;

  try {
    const akun = await Akun.findByPk(decoded.id)
    if (!akun) throw 'Akun tidak ditemukan!'

    const hapus = await Keranjang.destroy({
      where: {
        [Op.and]: [{ akunId: akun.id }, { BarangId: id }],
      },
    })
    if (!hapus) throw 'Gagal menghapus barang dari keranjang!'

    res
      .status(200)
      .json({
        status: 'success',
        message: 'Keranjang barang berhasil dihapus!',
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: 'Gagal menghapus barang dari keranjang!',
      })
      .end()
  }
}

const ubahJumlahBarang = async (req, res) => {
  const logged = req.headers.authorization.split(' ')[1]
  // const logged = req.cookies.logged_account
  const decoded = jwt.verify(logged, 'jwtAkunId')
  const { id } = req.params

  try {
    const akun = await Akun.findByPk(decoded.id)
    if (!akun) {
      return res
        .status(404)
        .json({
          status: 'fail',
          message: 'Akun tidak ditemukan!',
        })
        .end()
    }

    const keranjang = await Keranjang.findOne({
      where: {
        [Op.and]: [{ akunId: akun.id }, { BarangId: id }],
      },
    })

    const currJumlah = keranjang.getDataValue('jumlah')

    const ubahJumlah = await keranjang.update({
      jumlah: currJumlah - 1,
    })
    if (!ubahJumlah)
      return res.status(500).json({
        status: 'fail',
        message: 'Gagal mengubah jumlah barang!',
      })

    res
      .status(200)
      .json({
        status: 'success',
        message: 'Berhasil mengubah jumlah barang!',
        jumlah: ubahJumlah,
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        message: 'Gagal menghapus barang dari keranjang!',
      })
      .end()
  }
}

module.exports = {
  daftarKeranjang,
  tambahKeKeranjang,
  hapusDariKeranjang,
  ubahJumlahBarang,
  allCartList,
}
