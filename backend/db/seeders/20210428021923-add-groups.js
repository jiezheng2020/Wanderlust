"use strict";
const faker = require("faker");
const models = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const GroupsData = [];

    const users = await models.User.findAll();

    for (let i = 0; i < 20; i++) {
      const name = [
        "Friends In " + faker.address.country(),
        "Hikers Of " + faker.address.city(),
        "Residents Of " + faker.address.city(),
      ];
      const randId = Math.floor(Math.random() * users.length + 1);
      const randName = Math.floor(Math.random() * name.length);
      const randlocation = faker.address.city();

      let newGroup = {
        name: name[randName],
        location: randlocation,
        organizerId: randId,
        description: faker.lorem.paragraphs(),
        image:
          "https://media.istockphoto.com/vectors/portrait-of-business-team-standing-together-multiracial-business-vector-id1151939169?k=6&m=1151939169&s=612x612&w=0&h=jHxk3XMAVOb6x2sW36oaaplVvPrjuVOmckQYMYE3EDo=",
      };
      GroupsData.push(newGroup);
    }
    return queryInterface.bulkInsert("Groups", GroupsData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Groups", null, {});
  },
};
