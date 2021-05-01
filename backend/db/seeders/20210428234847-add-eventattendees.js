"use strict";
const models = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const AttendeeData = [];

    const events = await models.Event.findAll();
    const user = await models.User.findAll();

    for (let i = 0; i < 1000; i++) {
      const randEvent = Math.floor(Math.random() * events.length + 1);
      const randUser = Math.floor(Math.random() * user.length + 1);

      let newAttendee = {
        eventId: randEvent,
        userId: randUser,
      };
      AttendeeData.push(newAttendee);
    }
    return queryInterface.bulkInsert("EventAttendees", AttendeeData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("EventAttendees", null, {});
  },
};
