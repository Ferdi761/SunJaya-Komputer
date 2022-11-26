const { Keranjang } = require('../database/models');

// daftar barang pelanggan di keranjang
const daftarKeranjang = async (req, res) => {
    const logged = req.cookie.logged_account;
    // decode cookie's token from jwt to get the id of Akun
    const decoded = jwt.verify(logged, 'jwtAkunId');

    try {
        const user = await Akun.findByPk(decoded.id);
        if (!user) throw 'Pengguna tidak ditemukan!';
        
        const keranjang = await Keranjang.findOne({ where: { akunId: user.id } });
        if (!keranjang) throw 'Keranjang tidak ditemukan!';
        
        res.status(200).json(keranjang).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err }).end();
    }
};

// add item into shopping cart (for customers)
const tambahKeKeranjang = async (req, res) => {
    const logged = req.cookies.logged_account;
    const idBarang = req.query.barang;
    const decoded = jwt.verify(logged, 'jwtAkunId');
    
    try {
        const user = await Akun.findByPk(decoded.id);
        if (!user) throw 'Pengguna tidak ditemukan!';

        const barang = await Barang.findByPk(idBarang);
        if (!barang) throw 'Barang tidak ditemukan!';

        const addToCart = await Keranjang.create({
            barangId: barang.id,
            akunId: user.id,
            jumlah: req.body.jumlah
        });
        console.log(addToCart);
        res.status(200).json(addToCart).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err }).end();
    }
};

// delete item from shopping cart
const hapusDariKeranjang = async (req, res) => {
    const idKeranjang = req.query.keranjang;

    try {
        const hapus = await Keranjang.destroy({ where: { id: idKeranjang } });
        res.status(200).json({ msg: "Keranjang barang berhasil dihapus!" }).end();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err }).end();
    }
};

module.exports = {
    daftarKeranjang,
    tambahKeKeranjang,
    hapusDariKeranjang
};