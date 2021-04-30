"use strict";
const models = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const CalendarData = [];

    const groups = await models.Group.findAll();
    const event = await models.Event.findAll();
    for (let i = 0; i < 200; i++) {
      const randGroup = Math.floor(Math.random() * groups.length + 1);
      const randEvent = Math.floor(Math.random() * event.length + 1);

      let newCalendar = {
        groupId: randGroup,
        eventId: randEvent,
      };
      CalendarData.push(newCalendar);
    }
    return queryInterface.bulkInsert("GroupCalendars", CalendarData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("GroupCalendars", null, {});
  },
};
