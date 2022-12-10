'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BuktiPembayaranGaransi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Garansi, {
        foreignKey: {
          name: 'garansiId'
        }
      });
    }
  }
  BuktiPembayaranGaransi.init({
    buktiPembayaran: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'BuktiPembayaranGaransi',
    modelName: 'BuktiPembayaranGaransi',
  });
  return BuktiPembayaranGaransi;
};