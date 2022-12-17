'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Akun',
      [
        {
          id: 99999999,
          nama: 'Nugraha Akbar',
          email: 'garuda.bangkit@gmail.com',
          passwordHashed:
            '$2a$10$r1hSPy9nXk4vWdpn3463AORRTpIAcxTqHlixJkTBj1hyB.PYZ.jzK',
          izin: 'admin',
          noTelp: '087855431437',
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Akun', null, {})
  },
}
