const bcrypt = require("bcrypt");
const Akun = require("../db/models/Akun");

const register = async (req, res) => {
const saltRounds = 10;

    try {
        const {
            nama,
            email,
            password,
            izin,
            telp,
        } = req.body;
    
        const passwordHashed = await bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                throw new Error(err);
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

        await 
    }
    catch (err) {

    }
};

module.exports = register;