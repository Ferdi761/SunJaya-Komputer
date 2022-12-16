'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Garansi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // foto dari pembeli untuk biaya ongkir ke alamat pembeli
      Garansi.hasOne(models.BuktiPembayaranGaransi, {
        foreignKey: {
          name: 'garansiId'
        }
      });

      Garansi.belongsTo(models.BarangYangDipesan, {
        foreignKey: {
          name: 'bydId'
        }
      });
    }
  }
  Garansi.init({
    jumlah: DataTypes.INTEGER, // jumlah brg yg rusak (diisi pembeli) req.body
    keluhan: DataTypes.TEXT, // diisi pembeli (req.body)
    alamatTujuan: DataTypes.TEXT, // diisi pembeli (req.body) menuju ke alamat penjual
    fotoPendukung: DataTypes.STRING, // diisi pembeli (req.body)
    diterima: DataTypes.BOOLEAN, // diisi penjual (onClick)
    diproses: DataTypes.BOOLEAN, // diisi penjual (onClick)
    disetujui: DataTypes.BOOLEAN, // diisi penjual (onClick)
    jasaPengiriman: DataTypes.STRING, // diisi penjual (req.body)
    biayaPengiriman: DataTypes.DECIMAL, // diisi penjual (req.body)
    pembayaranLunas: DataTypes.BOOLEAN, // diisi penjual (req.body)
    tanggalKirim: DataTypes.DATE, // diisi penjual (onClick)
    tanggalSampai: DataTypes.DATE // diisi pembeli (onClick)
  }, {
    sequelize,
    modelName: 'Garansi',
    tableName: 'Garansi',
    timestamps: false
  });
  return Garansi;
};