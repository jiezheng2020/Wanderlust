"use strict";
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      detailsBody: { type: DataTypes.TEXT, allowNull: false },
      detailsTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      groupId: { type: DataTypes.INTEGER, allowNull: false },
      hostId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Event.associate = function (models) {
    // associations can be defined here
  };
  return Event;
};
