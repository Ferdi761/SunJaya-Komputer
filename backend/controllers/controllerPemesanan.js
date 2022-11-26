const {
    Akun,
    Barang,
    BarangYangDipesan,
    BuktiPembayaranPemesanan
} = require('../database/models');

const checkout = async (req, res) => {
    const cookie = req.cookies.logged_account;
    const decoded = jwt.verify(cookie, 'jwtAkunId');

    try {
        pelanggan = await Akun.findByPk(decoded.id);

        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err }).end();
    }
};