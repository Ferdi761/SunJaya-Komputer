const { Rekening } = require("../database/models");

// daftar rekening admin (for all)
const daftarRekening = async (req, res) => {
    try {
        const rekening = await Rekening.findAll();
        res.status(201).json(rekening).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: [err] }).end();
    }

};

// admin only
const tambahRekening = async (req, res) => {
    const {
        namaBank,
        nomorRekening,
        atasNama
    } = req.body;

    const data = {
        namaBank,
        nomorRekening,
        atasNama
    };
    try {
        const rekening = await Rekening.create(data);
        res.status(201).json(rekening).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: [err] }).end();
    }
};

// admin only
const ubahDataRekening = async (req,res) => {
    const id = req.params.id;
    const {
        namaBank,
        nomorRekening,
        atasNama
    } = req.body;

    const data = {
        namaBank,
        nomorRekening,
        atasNama
    };
    
    try {
        const dataRekening = await Rekening.findOne({ where: { id: id } });
        if (!dataRekening) throw 'Rekening tidak ditemukan';
        
        await Rekening.update(data, { where: { id: id } });
        res.status(201).json({ msg: "Data berhasil diperbarui!" }).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: [err] }).end();
    }
};

// admin only
const hapusRekening = async (req, res) => {
    const id = req.params.id;

    try {
        const rekening = await Rekening.findOne({ where: {id: id} });
        if (!rekening) throw 'Rekening tidak ditemukan!';
        else {
            await rekening.destroy();
        }
        res.status(201).json({ msg: "Berhasil menghapus rekening!" }).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: [err] }).end();
    }
};

module.exports = {
    daftarRekening,
    tambahRekening,
    ubahDataRekening,
    hapusRekening
};