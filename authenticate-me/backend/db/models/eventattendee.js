"use strict";
module.exports = (sequelize, DataTypes) => {
  const EventAttendee = sequelize.define(
    "EventAttendee",
    {
      eventId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  EventAttendee.associate = function (models) {};
  return EventAttendee;
};
