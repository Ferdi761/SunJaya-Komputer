const passwordHash = require("../../middlewares/passwordHash");
const bcrypt = require("bcrypt");

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Akun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Akun.hasMany(models.Chat, {
        foreignKey: {
          name: 'akunId'
        }
      });

      Akun.hasMany(models.Pemesanan, {
        foreignKey: {
          name: 'akunId'
        }
      });

      Akun.belongsToMany(models.Barang, {
        through: models.Keranjang,
        foreignKey: {
          name: 'barangId'
        }
      });
    }
  }
  Akun.init({
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    passwordHashed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    izin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noTelp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Akun',
    tableName: 'Akun',
  });

  Akun.addHook('beforeCreate', passwordHash);
  Akun.addHook('beforeUpdate', passwordHash);

  Akun.loginCheck = async (email, password) => {
    const akun = await Akun.findOne({
      where: { email: email }
    });
    if (akun) {
      const auth = await bcrypt.compare(password, akun.passwordHashed);
      if (auth) {
        return akun;
      }
      throw Error("password salah");
    }
    throw Error("username salah");
  };

  return Akun;
};