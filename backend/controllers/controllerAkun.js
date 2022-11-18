const cookieParser = require('cookie-parser');
const { Akun } = require('../database/models');
// const isAdmin = require('../middlewares/isAdmin');

// view all akun
const listAkun = async (req, res) => {
    try {
        const akuns = await Akun.findAll();
        res.status(201).json(akuns);
    }
    catch(err) {
        console.log(err);
        res.status(500);
        res.json({ error: err });
        res.end();
    }
};

const ubahDataAkun = async (req, res) => {
    const id = req.params.id;
    const {
        nama,
        email,
        password,
        izin,
        noTelp,
    } = req.body;

    const data = {
        nama,
        email,
        password,
        izin,
        noTelp,
    };

    try {
        const akun = await Akun.findByPk(id);
        if (!akun) {
            throw 'Gagal mengubah data akun!';
        }
        console.log(`data lama: ${akun}`);
        const newData = await akun.update(data);
        console.log(`data baru: ${newData}`);
        res.status(201).json(newData).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: err
        }).end();
    }
};

module.exports = {
    listAkun,
    ubahDataAkun,
};