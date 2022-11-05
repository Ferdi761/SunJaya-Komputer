const { sequelize, Akun } = require("../database/models");

// view all akun
const listAkun = async (req, res) => {
    try {
        const akuns = await Akun.findAll();
        res.status(201).json(akuns);
    }
    catch(err) {
        console.log(err);
        res.status(500);
        res.json({ error: err });
        res.end();
    }
};

module.exports = { listAkun };