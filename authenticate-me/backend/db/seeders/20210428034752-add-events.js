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
      let randImage;
      if (names[randName].includes("Traveling"))
        randImage =
          "https://www.amerortho.com/storage/images/Travel%20image.jpg";
      if (names[randName].includes("Hiking"))
        randImage =
          "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/topic_centers/2019-8/couple-hiking-mountain-climbing-1296x728-header.jpg?w=1155&h=1528";
      if (names[randName].includes("Nightlife"))
        randImage =
          "https://planning-org-uploaded-media.s3.amazonaws.com/image/Planning-2020-02-image26.jpg";
      let newEvent = {
        name: names[randName],
        detailsBody: faker.hacker.phrase(),
        detailsTime: date,
        image: randImage,
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
