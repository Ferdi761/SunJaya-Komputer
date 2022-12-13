const { Akun } = require('../database/models')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { email, password } = req.body
  // const oneWeek = 7 * 24 * 60 * 60 * 3600;

  try {
    const akun = await Akun.loginCheck(email, password)
    // console.log("--------------------------------");
    // console.log(`email: ${akun.email} \n password: ${akun.passwordHashed}`);
    // console.log("--------------------------------");
    const id = akun.id
    const token = jwt.sign({ id }, 'jwtAkunId', {})

    res.cookie('logged_account', token, { httpOnly: true })

    res
      .status(201)
      .json({
        status: 'success',
        msg: 'Login berhasil',
        data: {
          id: akun.id,
          nama: akun.nama,
          email: akun.email,
          izin: akun.izin,
          noTelp: akun.noTelp,
          token,
        },
      })
      .end()

  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 'error', message: err.message })
  }
}

module.exports = login
