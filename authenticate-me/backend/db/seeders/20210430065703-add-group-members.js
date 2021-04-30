"use strict";
const models = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const MemberData = [];

    const groups = await models.Group.findAll();
    const user = await models.User.findAll();
    for (let i = 0; i < 300; i++) {
      const randGroup = Math.floor(Math.random() * groups.length + 1);
      const randUser = Math.floor(Math.random() * user.length + 1);

      let newMember = {
        groupId: randGroup,
        userId: randUser,
      };
      MemberData.push(newMember);
    }
    return queryInterface.bulkInsert("GroupMembers", MemberData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("GroupMembers", null, {});
  },
};
