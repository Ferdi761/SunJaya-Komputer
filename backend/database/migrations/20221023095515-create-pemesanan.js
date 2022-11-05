'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pemesanan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alamatTujuan: {
        type: Sequelize.TEXT
      },
      jasaPengiriman: {
        type: Sequelize.STRING
      },
      totalHargaBarang: {
        type: Sequelize.DECIMAL
      },
      biayaPengiriman: {
        type: Sequelize.DECIMAL
      },
      totalBiayaYangHarusDibayar: {
        type: Sequelize.DECIMAL
      },
      tanggalMulaiMenungguPembayaran: {
        type: Sequelize.DATE
      },
      pembayaranLunas: {
        type: Sequelize.BOOLEAN
      },
      tanggalKirim: {
        type: Sequelize.DATE
      },
      tanggalSampai: {
        type: Sequelize.DATE
      },
      rating: {
        type: Sequelize.DECIMAL
      },
      testimoni: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pemesanan');
  }
};