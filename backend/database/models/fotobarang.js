'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FotoBarang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Barang, {
        foreignKeys: {
          name: 'BarangId'
        }
      });
    }
  }
  FotoBarang.init({
    foto: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'FotoBarang',
    tableName: 'FotoBarang',
    timestamps: false
  });
  return FotoBarang;
};