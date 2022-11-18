const { Barang, JenisBarang, FotoBarang } = require('../database/models');
const fs = require("fs");

const daftarBarang = async (req, res) => {
    try {
        const semuaBarang = await FotoBarang.findAll({
            include: {
                model: Barang,
                right: true, // right outer join
                include: {
                    model: JenisBarang,
                    required: true // inner join
                }
            }
        });

        res.status(200).json(semuaBarang).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err }).end();
    }
};

const tambahBarang = async (req, res) => {
    const {
        namaBarang,
        merek,
        berat,
        jenis,
        harga,
        stok,
        deskripsi
    } = req.body;

    let foto = req.file.path;

    try {
        const jenisId = await JenisBarang.findOne({
            where: {
                nama: jenis
            }
        });

        if (jenisId === null) {
            throw 'Jenis barang tidak ditemukan!';
        }
        // else {
        //     const createBarang = await FotoBarang.create({
        //         foto: foto.toString(),
        //         barangId: {
        //             nama: namaBarang,
        //             merek: merek,
        //             berat: berat,
        //             jenisId: jenisId.id,
        //             harga: harga,
        //             stok: stok,
        //             deskripsi: deskripsi
        //         }
        //     },
        //     {
        //         include: [ Barang ]
        //     });

        //     console.log(createBarang);
        // }
        else {
            const data = {
                nama: namaBarang,
                merek,
                berat,
                jenisId: jenisId.id,
                harga,
                stok,
                deskripsi
            };
            const barang = await Barang.create(data);
            
            if (!barang) {
                throw 'Gagal menambahkan barang!';
            }
            else {
                // foto === null ? req.file : req.file.path;

                const fotoBarang = await FotoBarang.create({
                    foto: foto,
                    BarangId: barang.id
                });
                console.log(fotoBarang);
                console.log(__dirname);
                res.status(200).json({ msg: "Berhasil menambahkan barang!" }).end();
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err }).end();
    }

    


};

const detailBarang = async (req, res) => {
    const id = req.query.id;

    try {
        const infoBarang = await FotoBarang.findOne({
            where: {
                BarangId: id
            },
            include: {
                model: Barang,
                right: true, // right outer join
                include: {
                    model: JenisBarang,
                    required: true, // create an inner join
                }
            }
        });
        res.status(200).json(infoBarang).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: err
        }).end();
    }
};

const ubahDataBarang = async (req, res) => {
    const id = req.params.id;
    const {
        nama,
        merek,
        berat,
        jenis,
        harga,
        stok,
        deskripsi
    } = req.body;

    try {
        const barang = await Barang.findOne({
            where: {
                id: id
            }
        });

        if (barang) {
            const jenisId = await JenisBarang.findOne({
                where: {
                    nama: jenis
                }
            });
        
            if (jenisId === null) {
                throw 'jenis tidak ditemukan!';
            }

            const newData = {
                nama,
                merek,
                berat,
                jenisId: jenisId[id],
                harga,
                stok,
                deskripsi
            };

            const updateBarang = await Barang.update(newData, {
                where: {
                    id: id
                }
            });

            res.status(200).json(updateBarang).end();
        }
        else {
            throw 'Gagal memperbarui barang!';
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: err
        }).end();
    }
};

const hapusBarang = async (req, res) => {
    let id = req.params.id;

    try {
        const barang = await Barang.findOne({
            where: {
                id: id
            }
        });

        if (!barang) {
            throw 'Gagal menghapus barang!';
        }
        else {
            const fotoBarang = await FotoBarang.findOne({
                where: {
                    BarangId: id
                }
            });
            
            // delete photo from local storage
            fs.unlink(`${fotoBarang.foto}`, (err) => {
                if (err) throw 'Gagal menghapus foto dari penyimpanan lokal!';
                else console.log('Berhasil menghapus foto dari penyimpanan lokal!');
            });
            // delete photo's path from database
            await barang.destroy();

            res.status(200).json({
                msg: 'Barang berhasil dihapus!'
            }).end();
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: [err]
        }).end();
    }
};

const cariBarang = (req, res) => {};

module.exports = {
    daftarBarang,
    tambahBarang,
    detailBarang,
    ubahDataBarang,
    hapusBarang,
    cariBarang
};