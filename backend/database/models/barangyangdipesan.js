'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BarangYangDipesan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BarangYangDipesan.hasMany(models.Garansi, {
        foreignKey: {
          name: 'bydId'
        }
      });
    }
  }
  BarangYangDipesan.init({
    jumlah: DataTypes.INTEGER,
    totalHarga: DataTypes.INTEGER,
    garansiExpired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'BarangYangDipesan',
    modelName: 'BarangYangDipesan',
    timestamps: false
  });
  return BarangYangDipesan;
};