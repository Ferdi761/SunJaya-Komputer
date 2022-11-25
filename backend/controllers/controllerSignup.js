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
        
        const keranjang = await Keranjang.create({
            jumlah: 0,
            akunId: akun.id
        });

        console.log(keranjang);

        res.status(201).json(keranjang).end();
    }
    catch (err) {
        console.log(err);
    }

// console.log(req.files);
};


module.exports = registrasi;