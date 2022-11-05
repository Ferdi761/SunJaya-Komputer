const { sequelize, Akun } = require("../database/models");

const register = async (req, res) => {
    const {
        nama,
        email,
        password,
        izin,
        noTelp,
    } = req.body;
    
    try {
        const akun = await Akun.create({
            nama,
            email,
            passwordHashed: password,
            izin,
            noTelp,
        });
        console.log(akun);

        res.status(201).json(akun).end();
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = register;