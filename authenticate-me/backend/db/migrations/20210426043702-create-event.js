"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
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
      image: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue:
          "https://16jp781s7hqv3vm1s322uful-wpengine.netdna-ssl.com/wp-content/uploads/2016/11/Kabukicho-Shinjuku-Tokyo-Japan-1140x760.jpg",
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Groups" },
      },
      hostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Events");
  },
};
