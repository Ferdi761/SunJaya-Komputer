'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Barang.belongsTo(models.JenisBarang, {
        foreignKey: {
          name: 'jenisId'
        }
      });

      Barang.belongsToMany(models.Akun, {
        through: models.Keranjang,
        foreignKey: {
          name: 'BarangId'
        }
      });

      Barang.belongsToMany(models.Pemesanan, {
        through: models.BarangYangDipesan,
        foreignKeys: {
          name: 'BarangId'
        }
      });

      Barang.hasOne(models.FotoBarang, {
        foreignKeys: {
          name: 'BarangId'
        }
      });
    }
  }
  Barang.init({
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    harga: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    deskripsi: {
      type: DataTypes.TEXT
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        return this.getDataValue('stok');
      }
    },
    merek: {
      type: DataTypes.STRING,
      allowNull: false
    },
    berat: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Barang',
    modelName: 'Barang',
    timestamps: false
  });
  return Barang;
};