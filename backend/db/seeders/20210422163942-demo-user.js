"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const UserData = [
      {
        email: "demo@user.io",
        username: "Demo-lition",
        hashedPassword: bcrypt.hashSync("password"),
        image: faker.image.avatar(),
      },
    ];

    for (let i = 1; i < 51; i++) {
      let newUser = {
        email: faker.internet.email(),
        username: `FakeUser${i}`,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        image: faker.image.avatar(),
      };
      UserData.push(newUser);
    }
    return queryInterface.bulkInsert("Users", UserData, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
