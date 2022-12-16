const jwt = require('jsonwebtoken')
const { Akun } = require('../database/models')

const isAdmin = async (req, res, next) => {
  // console.log(req.cookies.logged_account);
  // let logged = req.headers.authorization
  let logged = req.cookies.logged_account;

  // console.log(logged_account);
  if (!logged) {
    return res.status(403).send('Anda belum login!').end()
  }
  try {
    // compare id from cookies and jwt
    const decoded = jwt.verify(logged.split(' ')[1])
    // console.log(decode["id"]);
    // const decoded = jwt.verify(logged, 'jwtAkunId')

    const admin = await Akun.findByPk(decoded['id'])
    // id not found
    if (!admin) {
      throw 'Admin tidak ditemukan!'
    }
    // izin === admin
    else if (admin.izin === 'admin') {
      console.log('access granted!')
    }
    // izin !== admin
    else {
      throw 'Bukan admin!'
    }
  } catch (err) {
    console.log(err)
  }
  next()
}

module.exports = isAdmin
