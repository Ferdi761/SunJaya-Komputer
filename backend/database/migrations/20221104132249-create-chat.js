'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chat', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      urutan: {
        type: Sequelize.INTEGER
      },
      teks: {
        type: Sequelize.TEXT
      },
      dariPelanggan: {
        type: Sequelize.BOOLEAN
      },
      dibaca: {
        type: Sequelize.BOOLEAN
      },
      dibuatPada: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chat');
  }
};