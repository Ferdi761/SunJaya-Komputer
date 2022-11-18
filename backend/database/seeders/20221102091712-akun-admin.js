'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Akun', [{
      id: 99999999,
      nama: 'Achmad Ferdiansyah',
      email: 'ferdiansyahachmad29@gmail.com',
      passwordHashed: '$2a$10$k7B8S97lBPsZ79aQltywPu5oYfu6yJN6KIrnbrQcrFDocFToqKYQ2',
      izin: 'admin',
      noTelp: '081333337461',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Akun', null, {});
  }
};
