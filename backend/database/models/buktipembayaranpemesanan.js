'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BuktiPembayaranPemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BuktiPembayaranPemesanan.belongsTo(models.Pemesanan);
    }
  }

  BuktiPembayaranPemesanan.init({
    buktiPembayaran: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'BuktiPembayaranPemesanan',
    tableName: 'BuktiPembayaranPemesanan',
  });
  return BuktiPembayaranPemesanan;
};