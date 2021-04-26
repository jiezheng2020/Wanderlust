"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(256),
        allowNull: false,
      },
      detailsBody: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      detailsTime: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      groupId: {
        type: Sequelize.INTEGER,
      },
      hostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Events");
  },
};
