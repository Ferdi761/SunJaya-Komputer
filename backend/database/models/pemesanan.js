'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pemesanan.hasOne(models.BuktiPembayaranPemesanan, {
        foreignKey: {
          name: 'pemesananId'
        }
      });

      Pemesanan.belongsToMany(models.Barang, {
        through: models.BarangYangDipesan,
        foreignKey: {
          name: 'pemesananId'
        }
      });

      Pemesanan.hasMany(models.BarangYangDipesan, {
        foreignKey: {
          name: 'pemesananId'
        }
      })

      Pemesanan.belongsTo(models.Akun, {
        foreignKey: {
          name: 'akunId'
        }
      });
    }
  }
  Pemesanan.init({
    alamatTujuan: DataTypes.TEXT,
    jasaPengiriman: DataTypes.STRING,
    totalHargaBarang: DataTypes.INTEGER,
    biayaPengiriman: DataTypes.INTEGER,
    totalBiayaYangHarusDibayar: DataTypes.INTEGER,
    tanggalMulaiMenungguPembayaran: DataTypes.DATE,
    pembayaranLunas: DataTypes.BOOLEAN,
    tanggalKirim: DataTypes.DATE,
    tanggalSampai: DataTypes.DATE,
    rating: DataTypes.INTEGER,
    testimoni: DataTypes.TEXT,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pemesanan',
    tableName: 'Pemesanan',
    timestamps: false,
  });

  return Pemesanan;
};