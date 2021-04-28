"use strict";
const faker = require("faker");
const models = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const GroupsData = [];

    const users = await models.User.findAll();

    for (let i = 0; i < 10; i++) {
      const name = [
        "Traveling to " + faker.address.country(),
        "Hiking Excursion at " + faker.address.city(),
        "Nightlife in " + faker.address.city(),
      ];
      const randId = Math.floor(Math.random() * users.length + 1);
      const randName = Math.floor(Math.random() * 3);
      const randlocation =
        faker.address.streetAddress() +
        " " +
        faker.address.city() +
        " " +
        faker.address.country();

      let newGroup = {
        name: name[randName],
        location: randlocation,
        organizerId: randId,
        description: faker.hacker.phrase(),
      };
      GroupsData.push(newGroup);
    }
    return queryInterface.bulkInsert("Groups", GroupsData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Groups", null, {});
  },
};
