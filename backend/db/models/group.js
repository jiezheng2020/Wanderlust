"use strict";
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      organizerId: { type: DataTypes.INTEGER, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
    },
    {}
  );
  Group.associate = function (models) {
    Group.hasMany(models.Event, { foreignKey: "groupId" });
    Group.belongsTo(models.User, { foreignKey: "organizerId" });
    Group.belongsToMany(models.User, {
      through: "GroupMember",
      foreignKey: "groupId",
      otherKey: "userId",
      as: "Members",
      onDelete: "CASCADE",
    });
    Group.belongsToMany(models.Event, {
      through: "GroupCalendar",
      foreignKey: "groupId",
      otherKey: "eventId",
      as: "Calendars",
      onDelete: "CASCADE",
    });
  };
  return Group;
};
