const { sequelize, Akun } = require("../database/models");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;
    const oneWeek = 7 * 24 * 60 * 60;

    try {
        const akun = await Akun.loginCheck(email, password);
        // console.log("--------------------------------");
        // console.log(`email: ${akun.email} \n password: ${akun.passwordHashed}`);
        // console.log("--------------------------------");
        const id = akun.id;
        const token = jwt.sign({ id }, 'roleAuth', {
            expiresIn: oneWeek
        });

        res.cookie('roleAuth', token, {
            httpOnly: true,
            maxAge: oneWeek 
        });

        res.status(201).json(akun);

        // const akun = await Akun.findOne({
        //     raw: true,
        //     where: { email: req.body.email }
        // });
        // if (akun === null) {
        //     throw Error("password salah");
        // }
        // else {
        //     const auth = await bcrypt.compare(req.body.password, akun.passwordHashed);

        //     if (auth === null) {
        //     throw Error("username salah");
        //     }
        //     else {
        //         return akun;
        //     }
        // }   
    }
    catch (err) {
        // console.log(err);
        res.status(500).json({ err });
        // res.send(err);
    }

    res.end();
};

module.exports = login;