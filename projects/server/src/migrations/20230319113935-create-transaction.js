'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tgl_checkin: {
        type: Sequelize.STRING
      },
      tgl_checkout: {
        type: Sequelize.STRING
      },
      bukti_pembayaran: {
        type: Sequelize.STRING
      },
      order_status: {
        type: Sequelize.STRING
      },
      users_id: {
        type: Sequelize.INTEGER
      },
      reviews_id: {
        type: Sequelize.INTEGER
      },
      propertys_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('transactions');
  }
};