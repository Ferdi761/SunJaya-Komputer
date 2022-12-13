const { Akun, Keranjang } = require("../database/models");

// buat akun
const registrasi = async (req, res) => {
    const {
        nama,
        email,
        password,
        izin,
        noTelp,
    } = req.body;
    
    try {
        const akun = await Akun.create({
            nama,
            email,
            passwordHashed: password,
            izin,
            noTelp,
        });
        console.log(akun);

        res.status(201).json({
            status: 'success',
            message: 'Akun berhasil dibuat!',
            data: akun
        }).end();
    }
    catch (err) {
        console.log(err);
        res
        .status(500)
        .json({
            status: 'fail',
            message: 'Gagal membuat akun!',
            error: [err]
        })
    }
};


module.exports = registrasi;