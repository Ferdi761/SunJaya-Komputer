'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JenisBarang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Barang, {
        foreignKey: {
          name: 'jenisId'
        }
      });
    }
  }
  JenisBarang.init({
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'JenisBarang',
    modelName: 'JenisBarang',
    timestamps: false
  });
  return JenisBarang;
};