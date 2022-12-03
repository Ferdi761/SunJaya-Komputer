'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rekening extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rekening.init({
    namaBank: DataTypes.STRING,
    nomorRekening: DataTypes.STRING,
    atasNama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rekening',
    tableName: 'Rekening',
    timestamps: false
  });
  return Rekening;
};