"use strict";
const faker = require("faker");
const models = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const EventsData = [];

    const group = await models.Group.findAll();
    const user = await models.User.findAll();

    for (let i = 0; i < 200; i++) {
      const names = [
        "Traveling to " + faker.address.country(),
        "Hiking Excursion at " + faker.address.city(),
        "Nightlife in " + faker.address.city(),
      ];
      const randName = Math.floor(Math.random() * 3);

      const randDay = Math.floor(Math.random() * 31 + 1);
      const randYear = Math.floor(Math.random() * 3 + 2022);
      const date = faker.date.month() + `, ${randDay}, ${randYear}`;

      const randGroup = Math.floor(Math.random() * group.length + 1);
      const randUser = Math.floor(Math.random() * user.length + 1);

      let newEvent = {
        name: names[randName],
        detailsBody: faker.hacker.phrase(),
        detailsTime: date,
        groupId: randGroup,
        hostId: randUser,
      };
      EventsData.push(newEvent);
    }
    return queryInterface.bulkInsert("Events", EventsData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Events", null, {});
  },
};
