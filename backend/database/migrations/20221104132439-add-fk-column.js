'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // barangid b nya kecil harusnya
    await queryInterface.addColumn('BarangYangDipesan', 'BarangId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Barang',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('BarangYangDipesan', 'pemesananId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Pemesanan',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Garansi', 'bydId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'BarangYangDipesan',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Barang', 'jenisId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'JenisBarang',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // barangid b nya kecil harusnya
    await queryInterface.addColumn('FotoBarang', 'BarangId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Barang',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('BuktiPembayaranGaransi', 'garansiId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Garansi',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('BuktiPembayaranPemesanan', 'pemesananId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Pemesanan',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Pemesanan', 'akunId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Akun',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Chat', 'akunId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Akun',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE' // set null apa cascade ya ???
    });

    await queryInterface.addColumn('Keranjang', 'akunId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Akun',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('Keranjang', 'BarangId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Barang',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('BarangYangDipesan', 'BarangId', {});
    await queryInterface.removeColumn('BarangYangDipesan', 'pemesananId', {});
    await queryInterface.removeColumn('Garansi', 'bydId', {});
    await queryInterface.removeColumn('Barang', 'jenisId', {});
    await queryInterface.removeColumn('FotoBarang', 'BarangId', {});
    await queryInterface.removeColumn('BuktiPembayaranGaransi', 'garansiId', {});
    await queryInterface.removeColumn('BuktiPembayaranPemesanan', 'pemesananId', {});
    await queryInterface.removeColumn('Pemesanan', 'akunId', {});
    await queryInterface.removeColumn('Chat', 'akunId', {});
    await queryInterface.removeColumn('Keranjang', 'akunId', {});
    await queryInterface.removeColumn('Keranjang', 'BarangId', {});
  }
};
