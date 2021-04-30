"use strict";
const models = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const CalendarData = [];

    const groups = await models.Group.findAll();
    const event = await models.Event.findAll();
    for (let i = 0; i < event.length; i++) {
      let newCalendar = {
        groupId: event[i].groupId,
        eventId: event[i].id,
      };
      CalendarData.push(newCalendar);
    }
    return queryInterface.bulkInsert("GroupCalendars", CalendarData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("GroupCalendars", null, {});
  },
};
