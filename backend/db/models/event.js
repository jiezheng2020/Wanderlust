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
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      groupId: { type: DataTypes.INTEGER, allowNull: false },
      hostId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Event.associate = function (models) {
    Event.belongsTo(models.User, { foreignKey: "hostId" });
    Event.belongsTo(models.Group, { foreignKey: "groupId" });
    Event.belongsToMany(models.User, {
      through: "Comment",
      foreignKey: "eventId",
      otherKey: "userId",
      as: "Comments",
      onDelete: "CASCADE",
    });
    Event.belongsToMany(models.User, {
      through: "EventAttendee",
      foreignKey: "eventId",
      otherKey: "userId",
      as: "Attendees",
      onDelete: "CASCADE",
    });
    Event.belongsToMany(models.Group, {
      through: "GroupCalendar",
      foreignKey: "eventId",
      otherKey: "groupId",
      as: "Calendars",
      onDelete: "CASCADE",
    });
  };
  return Event;
};
