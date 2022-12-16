'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Garansi', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jumlah: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      keluhan: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      alamatTujuan: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      fotoPendukung: {
        allowNull: false,
        type: Sequelize.STRING
      },
      diterima: {
        type: Sequelize.BOOLEAN
      },
      diproses: {
        type: Sequelize.BOOLEAN
      },
      disetujui: {
        type: Sequelize.BOOLEAN
      },
      jasaPengiriman: {
        type: Sequelize.STRING
      },
      biayaPengiriman: {
        type: Sequelize.DECIMAL
      },
      pembayaranLunas: {
        type: Sequelize.BOOLEAN
      },
      tanggalKirim: {
        type: Sequelize.DATE
      },
      tanggalSampai: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Garansi');
  }
};