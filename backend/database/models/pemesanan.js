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
          name: 'barangId'
        }
      });

      Pemesanan.belongsTo(models.Akun);
    }
  }
  Pemesanan.init({
    alamatTujuan: DataTypes.TEXT,
    jasaPengiriman: DataTypes.STRING,
    totalHargaBarang: DataTypes.DECIMAL,
    biayaPengiriman: DataTypes.DECIMAL,
    totalBiayaYangHarusDibayar: DataTypes.DECIMAL,
    tanggalMulaiMenungguPembayaran: DataTypes.DATE,
    pembayaranLunas: DataTypes.BOOLEAN,
    tanggalKirim: DataTypes.DATE,
    tanggalSampai: DataTypes.DATE,
    rating: DataTypes.DECIMAL,
    testimoni: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Pemesanan',
    tableName: 'Pemesanan',
  });
  return Pemesanan;
};