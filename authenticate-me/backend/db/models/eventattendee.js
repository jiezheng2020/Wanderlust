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
  EventAttendee.associate = function (models) {
    EventAttendee.belongsTo(models.Event, { foreignKey: "eventId" });
    EventAttendee.belongsTo(models.User, { foreignKey: "userId" });
  };
  return EventAttendee;
};
