const Akun = (sequelize, DataTypes) => {
    return sequelize.define("Akun", {
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        passwordHashed: {
            type: DataTypes.STRING,
        },
        izin: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

module.exports = Akun;