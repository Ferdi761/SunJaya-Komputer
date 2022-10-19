const bcrypt = require("bcrypt");
const Akun = require("../db/models/Akun");

const register = async (req, res) => {
    const saltRounds = 10;

    const {
        nama,
        email,
        password,
        izin,
        telp,
    } = req.body;

    try {
        const passwordHashed = await bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                throw err;
            };
            return hash;
        });
    
        const data = {
            nama,
            email,
            passwordHashed,
            izin,
            telp,
        };

        const akun = await Akun.create(data);
        console.log(akun);
    }
    catch (err) {
        console.log(err);
    }

    res.end();
};

module.exports = register;