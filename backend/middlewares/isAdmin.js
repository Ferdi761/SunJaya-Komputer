const jwt = require('jsonwebtoken');
const { Akun } = require("../database/models");

const isAdmin = async (req, res, next) => {
    // console.log(req.cookies.logged_account);
    let logged_account = req.cookies.logged_account;

    // console.log(logged_account);
    if (!logged_account) {
        return res.status(403).send("Anda belum login!").end();
        
    }
    try {
        const decode = jwt.verify(logged_account, 'jwtAkunId');
        // console.log(decode["id"]);

        const admin = await Akun.findByPk(decode["id"]);
        if (!admin) {
            throw 'Admin tidak ditemukan!';
        }
        else if (admin.izin !== 'admin') {
            // console.log(admin.izin);
            throw 'Bukan admin!';
        }
        else {
            console.log("access granted!");
        }
    }
    catch (err) {
        console.log(err);
    }
    next();
};

module.exports = isAdmin;