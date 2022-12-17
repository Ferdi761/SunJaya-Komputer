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
      },
      totalHargaBarang: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      biayaPengiriman: {
        type: Sequelize.DECIMAL,
      },
      totalBiayaYangHarusDibayar: {
        type: Sequelize.DECIMAL,
      },
      tanggalMulaiMenungguPembayaran: {
        type: Sequelize.DATE,
      },
      pembayaranLunas: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
      status: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pemesanan');
  }
};