'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Barang', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING
      },
      harga: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      deskripsi: {
        type: Sequelize.TEXT
      },
      stok: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      merek: {
        allowNull: false,
        type: Sequelize.STRING
      },
      berat: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Barang');
  }
};