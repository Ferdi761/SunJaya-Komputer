'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Keranjang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Keranjang.belongsTo(models.Akun, {
        foreignKey: {
          name: 'akunId'
        }
      });

      Keranjang.belongsTo(models.Barang, {
        foreignKey: {
          name: 'BarangId'
        }
      });
    }
  }
  Keranjang.init({
    jumlah: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      get() {
        return this.getDataValue('jumlah')
      }
    }
  }, {
    sequelize,
    modelName: 'Keranjang',
    tableName: 'Keranjang',
    timestamps: false
  });
  return Keranjang;
};