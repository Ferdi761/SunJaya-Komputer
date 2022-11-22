const { JenisBarang } = require('../database/models');

const tambahJenis = async (req, res) => {
    const { nama } = req.body;
    // const data = { nama };

    try {
        const addJenis = await JenisBarang.create({ nama });
        console.log("\n\nini errornya!\n\n");
        console.log(addJenis);
        res.status(200).json(addJenis).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err }).end();
    }
};

const daftarJenis = async (req, res) => {
    try {
        const jenis = await JenisBarang.findAll();
        res.status(200).json(jenis).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err }).end();
    }
};

const hapusJenis = async (req, res) => {
    const id = req.params.id;

    try {
        const jenis = await JenisBarang.findOne({
            where: {
                id: id
            }
        });

        if (jenis) {
            await jenis.destroy({
                where: {
                    id: id
                }
            });

            res.status(200).json({
                msg: "Jenis barang berhasil dihapus!"
            }).end();
        }
    }
    catch (err) {
        res.status(500).json({
            msg: "Gagal menghapus jenis barang!"
        }).end();
    }
};

const editJenis = async (req, res) => {
    let id = req.params.id;

    const { nama } = req.body;

    try {
        const jenis = await JenisBarang.findOne({
            where: {
                id: id
            }
        });

        if (jenis) {
            await jenis.update({ nama }, {
                where: {
                    id: id
                }
            });

            res.status(200).json({
                msg: "Berhasil mengubah jenis barang!"
            }).end();
        }
    }
    catch (err) {
        res.status(500).json({
            msg: "Gagal mengubah jenis barang!"
        }).end();
    }
};

module.exports = {
    tambahJenis,
    daftarJenis,
    hapusJenis,
    editJenis
};