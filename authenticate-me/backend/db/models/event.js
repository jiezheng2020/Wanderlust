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
    Event.belongsTo(models.User, { foreignKey: "hostId" });
    Event.belongsTo(models.Group, { foreignKey: "groupId" });
    Event.hasMany(models.EventAttendee, { foreignKey: "eventId" });
    Event.hasMany(models.Comment, { foreignKey: "eventId" });
  };
  return Event;
};
