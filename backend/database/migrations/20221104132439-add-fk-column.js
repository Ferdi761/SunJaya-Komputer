'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('BarangYangDipesan', 'barangId', {
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
      onDelete: 'SET NULL'
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

    await queryInterface.addColumn('FotoBarang', 'barangId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Barang',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('BuktiPembayaranGaransi', 'garansiId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Garansi',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('BuktiPembayaranPemesanan', 'pemesananId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Pemesanan',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('Pemesanan', 'akunId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Akun',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('Chat', 'akunId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Akun',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
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

    await queryInterface.addColumn('Keranjang', 'barangId', {
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
    await queryInterface.removeColumn('BarangYangDipesan', 'barangId', {});
    await queryInterface.removeColumn('BarangYangDipesan', 'pemesananId', {});
    await queryInterface.removeColumn('Garansi', 'bydId', {});
    await queryInterface.removeColumn('Barang', 'jenisId', {});
    await queryInterface.removeColumn('FotoBarang', 'barangId', {});
    await queryInterface.removeColumn('BuktiPembayaranGaransi', 'garansiId', {});
    await queryInterface.removeColumn('BuktiPembayaranPemesanan', 'pemesananId', {});
    await queryInterface.removeColumn('Pemesanan', 'akunId', {});
    await queryInterface.removeColumn('Chat', 'akunId', {});
    await queryInterface.removeColumn('Keranjang', 'akunId', {});
    await queryInterface.removeColumn('Keranjang', 'barangId', {});
  }
};
