'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BarangYangDipesan', {
      id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
      jumlah: {
        type: Sequelize.INTEGER
      },
      totalHarga: {
        type: Sequelize.INTEGER
      },
      garansiExpired: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BarangYangDipesan');
  }
};