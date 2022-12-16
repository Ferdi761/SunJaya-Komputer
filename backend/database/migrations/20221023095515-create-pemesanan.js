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
        type: Sequelize.TEXT,
        allowNull: false,
      },
      jasaPengiriman: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalHargaBarang: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      biayaPengiriman: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      totalBiayaYangHarusDibayar: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      tanggalMulaiMenungguPembayaran: {
        type: Sequelize.DATE,
        allowNull: false,
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pemesanan');
  }
};