const {
  Barang,
  JenisBarang,
  FotoBarang,
} = require('../database/models')
const { Op } = require('sequelize')
const fs = require('fs')

// for all
const daftarBarang = async (req, res) => {
  try {
    const semuaBarang = await FotoBarang.findAll({
      include: {
        model: Barang,
        required: true,
        include: {
          model: JenisBarang,
          required: true, // inner join
        },
      },
    })

    res.status(200).json(semuaBarang).end()
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err }).end()
  }
}

// admin only
const tambahBarang = async (req, res) => {
  const { namaBarang, merek, berat, jenis, harga, stok, deskripsi } =
    req.body

  let foto = req.file.path

  try {
    const jenisId = await JenisBarang.findOne({
      where: { nama: jenis },
    })

    if (jenisId === null) {
      throw 'Jenis barang tidak ditemukan!'
    } else {
      const barang = await FotoBarang.create(
        {
          foto: foto,
          Barang: {
            nama: namaBarang,
            merek,
            berat,
            jenisId: jenisId.id,
            harga,
            stok,
            deskripsi,
          }, // masih error, harusnya b nya lowercase
        },
        {
          include: Barang,
        }
      )
      console.log(barang)
      res
        .status(200)
        .json({
          status: 'Success',
          msg: 'Berhasil menambahkan barang!',
          data: barang,
        })
        .end()
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err }).end()
  }
}

// for all
const detailBarang = async (req, res) => {
  const { id } = req.params

  try {
    const infoBarang = await FotoBarang.findOne({
      where: {
        BarangId: id,
      },
      include: {
        model: Barang,
        include: {
          model: JenisBarang,
          required: true, // create an inner join
        },
      },
    })
    res
      .status(200)
      .json({
        status: 'success',
        data: infoBarang,
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        msg: err,
      })
      .end()
  }
}

// edit sudah benar tapi ragu (admin only)
const ubahDataBarang = async (req, res) => {
  const id = req.params.id
  const { namaBarang, merek, berat, jenis, harga, stok, deskripsi } =
    req.body

  const img = req.file

  try {
    const fotoBarang = await FotoBarang.findOne({
      where: { BarangId: id },
    })

    if (img) {
      if (fotoBarang.foto) fs.unlinkSync(`${fotoBarang.foto}`)
      const updateData = await fotoBarang.update(
        { foto: req.file.path },
        { where: { BarangId: id } }
      )

      res
        .status(200)
        .json({
          status: 'success',
          msg: 'Berhasil memperbarui barang!',
          data: updateData,
        })
        .end()

      return
    }

    const barang = await Barang.findOne({
      where: {
        id: id,
      },
    })

    if (barang) {
      const jenisId = await JenisBarang.findOne({
        where: { nama: jenis },
      })

      if (jenisId === null) {
        throw 'jenis tidak ditemukan!'
      }
      const newData = {
        nama: namaBarang,
        merek,
        berat,
        jenisId: jenisId.id,
        harga,
        stok,
        deskripsi,
      }

      const updateBarang = await Barang.update(newData, {
        where: {
          id: id,
        },
      })
      if (!updateBarang) throw 'Gagal mengubah data barang!'

      res
        .status(200)
        .json({
          status: 'success',
          msg: 'Berhasil memperbarui barang!',
          data: updateBarang,
        })
        .end()

      return
    } else throw 'Gagal memperbarui barang!'
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'failed',
        msg: [err],
      })
      .end()
  }
}

const hapusBarang = async (req, res) => {
  let { id } = req.params

  try {
    const barang = await Barang.findOne({
      where: {
        id: id,
      },
    })

    if (!barang) {
      throw 'Gagal menghapus barang!'
    } else {
      const fotoBarang = await FotoBarang.findOne({
        where: {
          BarangId: id,
        },
      })

      // delete photo from local storage
      fs.unlink(`${fotoBarang.foto}`, (err) => {
        if (err) throw 'Gagal menghapus foto dari penyimpanan lokal!'
        else
          console.log(
            'Berhasil menghapus foto dari penyimpanan lokal!'
          )
      })
      // delete photo's path from database
      await barang.destroy()

      res
        .status(200)
        .json({
          status: 'success',
          msg: 'Barang berhasil dihapus!',
        })
        .end()
    }
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        status: 'fail',
        msg: [err],
      })
      .end()
  }
}

const cariBarang = async (req, res) => {
  // const input = req.body.input;
  const nama = req.query.nama

  try {
    const foundBarang = await Barang.findAll({
      where: {
        nama: { [Op.iLike]: `%${nama}%` },
      },
    })

    console.log(nama)
    res
      .status(201)
      .json({
        status: 'success',
        data: foundBarang,
      })
      .end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        msg: [err],
      })
      .end()
  }
}

module.exports = {
  daftarBarang,
  tambahBarang,
  detailBarang,
  ubahDataBarang,
  hapusBarang,
  cariBarang,
}
