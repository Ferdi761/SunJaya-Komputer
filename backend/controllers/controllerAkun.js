const cookieParser = require('cookie-parser')
const { Akun } = require('../database/models')
// const isAdmin = require('../middlewares/isAdmin');

// view all akun (admin only
const listAkun = async (req, res) => {
  try {
    const akuns = await Akun.findAll()
    res
      .status(200)
      .json({
        status: 'success',
        data: akuns,
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

const listKaryawan = async (req, res) => {
  try {
    const akuns = await Akun.findAll({
      where: {
        izin: 'karyawan',
      },
    })

    res
      .status(200)
      .json({
        status: 'success',
        data: akuns,
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

const ubahDataAkun = async (req, res) => {
  const id = req.params.id
  const { nama, email, password, izin, noTelp } = req.body

  const data = {
    nama,
    email,
    password,
    izin,
    noTelp,
  }

  try {
    const akun = await Akun.findByPk(id)
    if (!akun) {
      throw 'Gagal mengubah data akun!'
    }
    console.log(`data lama: ${akun}`)
    const newData = await akun.update(data)
    console.log(`data baru: ${newData}`)
    res.status(201).json(newData).end()
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

const ubahDataAdmin = async (req, res) => {
  const { id } = req.params
  const { nama, email, password, noTelp } = req.body

  const data = {
    nama,
    email,
    password,
    noTelp,
  }

  try {
    const akun = await Akun.findByPk(id)
    if (!akun) {
      throw 'Gagal mengubah data akun!'
    }
    console.log(`data lama: ${akun}`)
    const newData = await akun.update(data)
    console.log(`data baru: ${newData}`)
    res.status(201).json(newData).end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        message: [err],
      })
      .end()
  }
}

const hapusAkun = async (req, res) => {
  const { id } = req.params
  try {
    const akun = await Akun.findByPk(id)
    if (!akun) {
      throw 'Gagal menghapus akun!'
    }
    await akun.destroy()
    res.status(200).json({ message: 'Akun berhasil dihapus!' }).end()
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({
        message: [err],
      })
      .end()
  }
}

module.exports = {
  listAkun,
  ubahDataAkun,
  ubahDataAdmin,
  listKaryawan,
  hapusAkun,
}
