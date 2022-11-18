const { Akun } = require("../database/models");

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

        res.status(201).json(akun).end();
    }
    catch (err) {
        console.log(err);
    }

// console.log(req.files);
};


module.exports = registrasi;