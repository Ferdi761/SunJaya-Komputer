'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('JenisBarang', [
      {
        nama: 'Aksesoris',
      },
      {
        nama: 'Kabel dan Adaptor',
      },
      {
        nama: 'Komponen Komputer',
      },
      {
        nama: 'Komponen Laptop',
      },
      {
        nama: 'Media Penyimpanan Data',
      },
      {
        nama: 'Memory Card',
      },
      {
        nama: 'Monitor',
      },
      {
        nama: 'Networking',
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
