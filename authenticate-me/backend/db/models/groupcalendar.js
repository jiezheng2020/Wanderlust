"use strict";
module.exports = (sequelize, DataTypes) => {
  const GroupCalendar = sequelize.define(
    "GroupCalendar",
    {
      eventId: { type: DataTypes.INTEGER, allowNull: false },
      groupId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  GroupCalendar.associate = function (models) {
    GroupCalendar.belongsTo(models.Group, { foreignKey: "groupId" });
    GroupCalendar.belongsTo(models.Event, { foreignKey: "eventId" });
  };
  return GroupCalendar;
};
