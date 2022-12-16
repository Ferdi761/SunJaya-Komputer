const { JenisBarang } = require('../database/models');

const tambahJenis = async (req, res) => {
    const { nama } = req.body;

    try {
        const addJenis = await JenisBarang.create({ nama });
        console.log("\n\nini errornya!\n\n");
        console.log(addJenis);
        res.status(200).json(addJenis).end();
    }
    catch (err) {
        console.log(err);
        res
        .status(500)
        .json({
            status: 'fail',
            message: 'Gagal menambahkan jenis barang!'
        })
        .end();
    }
};

const daftarJenis = async (req, res) => {
    try {
        const jenis = await JenisBarang.findAll();
        res
        .status(200)
        .json({
            status: 'success',
            data: jenis
        })
        .end();
    }
    catch (err) {
        console.log(err);
        res
        .status(500)
        .json({
            status: 'fail',
            message: 'Gagal menampilkan jenis barang!'
        })
        .end();
    }
};

const hapusJenis = async (req, res) => {
    const { id } = req.params;

    try {
        const jenis = await JenisBarang.findOne({
            where: {
                id: id
            }
        });

        if (jenis) {
            await jenis.destroy();

            res
            .status(200)
            .json({
                status: 'success',
                message: "Jenis barang berhasil dihapus!"
            })
            .end();
        }
    }
    catch (err) {
        console.log(err);
        
        res
        .status(500)
        .json({
            status: 'fail',
            message: 'Gagal menghapus jenis barang!'
        }).end();
    }
};

const editJenis = async (req, res) => {
    let { id } = req.params;

    const { nama } = req.body;

    try {
        const jenis = await JenisBarang.findOne({
            where: {
                id: id
            }
        });

        if (jenis) {
            await jenis.update({ nama });

            res
            .status(200)
            .json({
                status: 'success',
                message: 'Berhasil mengubah jenis barang!'
            })
            .end();
        }
        else throw 'Gagal mengubah jenis barang!'
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: "Gagal mengubah jenis barang!"
        }).end();
    }
};

module.exports = {
    tambahJenis,
    daftarJenis,
    hapusJenis,
    editJenis
};