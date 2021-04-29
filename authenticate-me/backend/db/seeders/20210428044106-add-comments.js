"use strict";
const faker = require("faker");
const models = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const CommentsData = [];

    const events = await models.Event.findAll();
    const user = await models.User.findAll();
    for (let i = 0; i < 1000; i++) {
      const bodyArr = [
        "This group has good events! Would recommend!",
        "Sounds fun",
        "Excited",
        faker.commerce.productAdjective(),
        faker.hacker.phrase(),
      ];
      const randBody = Math.floor(Math.random() * bodyArr.length);
      const randEvent = Math.floor(Math.random() * events.length + 1);
      const randUser = Math.floor(Math.random() * user.length + 1);

      let newComment = {
        eventId: randEvent,
        userId: randUser,
        body: bodyArr[randBody],
      };
      CommentsData.push(newComment);
    }
    return queryInterface.bulkInsert("Comments", CommentsData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
