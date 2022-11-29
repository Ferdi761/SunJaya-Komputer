const { Keranjang, Akun, Barang } = require('../database/models');
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

// melihat semua daftar keranjang (untuk testing)
const allCartList = async (req, res) => {
    try {
        const cartList = await Keranjang.findAll();
        console.log(cartList);
        res.status(200).json(cartList).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err).end();
    }
};


// daftar barang pelanggan di keranjang
const daftarKeranjang = async (req, res) => {
    const logged = req.cookies.logged_account;
    // decode cookie's token from jwt to get the id of Akun
    const decoded = jwt.verify(logged, 'jwtAkunId');

    try {
        const userCart = await Akun.findOne({
            where: { id: decoded.id },
            include: Barang
        });
        if (!userCart) throw 'Pengguna tidak ditemukan!';
        
        // const keranjang = await Keranjang.findAll({ where: { akunId: user.id } });
        // if (!keranjang) throw 'Keranjang tidak ditemukan!';
        
        res.status(200).json({
            status: "success",
            data: userCart
        }).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err }).end();
    }
};

// add item into shopping cart (for customers)
const tambahKeKeranjang = async (req, res) => {
    const logged = req.cookies.logged_account;
    const idBarang = req.query.id;
    const decoded = jwt.verify(logged, 'jwtAkunId');
    
    const jumlah = req.body.jumlah;

    try {
        const user = await Akun.findByPk(decoded.id);
        if (!user) throw 'Pengguna tidak ditemukan!';

        const barang = await Barang.findByPk(idBarang);
        if (!barang) throw 'Barang tidak ditemukan!';

        const addToCart = await Keranjang.create({
            barangId: barang.id,
            akunId: user.id,
            jumlah: jumlah
        });
        console.log(addToCart);
        res.status(200).json({
            status: "Success",
            data: addToCart
        }).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err }).end();
    }
};

// delete item from shopping cart
const hapusDariKeranjang = async (req, res) => {
    const logged = req.cookies.logged_account;
    const decoded = jwt.verify(logged, 'jwtAkunId');
    const idBarang = req.body.barangId;

    try {
        const akun = await Akun.findByPk(decoded.id);
        if (!akun) throw 'Akun tidak ditemukan!';

        const hapus = await Keranjang.destroy({
            where: {
                [Op]: [
                    { akunId: akun.id },
                    { barangId: idBarang }
                ]
            }
        });
        if (!hapus) throw 'Gagal menghapus barang dari keranjang!';

        res.status(200).json({
            status: "success",
            msg: "Keranjang barang berhasil dihapus!"
        }).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err }).end();
    }
};

module.exports = {
    daftarKeranjang,
    tambahKeKeranjang,
    hapusDariKeranjang,
    allCartList
};