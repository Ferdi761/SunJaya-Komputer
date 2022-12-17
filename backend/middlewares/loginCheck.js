const loginCheck = async (req, res, next) => {
  // const logged = req.headers.authorization
  const logged = req.cookies.logged_account;
  try {
    if (!logged)
      return res.status(200).json({ msg: 'Anda belum login!' }).end()
    else next()
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: err }).end()
  }
}

module.exports = loginCheck
