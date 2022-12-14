'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chat.belongsTo(models.Akun, {
        foreignKey: {
          name: 'akunId'
        }
      });
    }
  }
  Chat.init({
    urutan: DataTypes.INTEGER,
    teks: DataTypes.TEXT,
    dariPelanggan: DataTypes.BOOLEAN,
    dibaca: DataTypes.BOOLEAN,
    dibuatPada: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Chat',
    tableName: 'Chat',
    timestamps: false,
  });
  return Chat;
};