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
      // define association here
      Garansi.hasOne(models.BuktiPembayaranGaransi, {
        foreignKey: {
          name: 'garansiId'
        }
      });

      Garansi.belongsTo(models.BarangYangDipesan);
    }
  }
  Garansi.init({
    jumlah: DataTypes.INTEGER,
    keluhan: DataTypes.TEXT,
    alamatTujuan: DataTypes.TEXT,
    fotoPendukung: DataTypes.STRING,
    diterima: DataTypes.BOOLEAN,
    diproses: DataTypes.BOOLEAN,
    disetujui: DataTypes.BOOLEAN,
    jasaPengiriman: DataTypes.STRING,
    biayaPengiriman: DataTypes.DECIMAL,
    pembayaranLunas: DataTypes.BOOLEAN,
    tanggalKirim: DataTypes.DATE,
    tanggalSampai: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Garansi',
    tableName: 'Garansi',
  });
  return Garansi;
};