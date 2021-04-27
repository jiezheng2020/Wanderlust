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
    },
    {}
  );
  Group.associate = function (models) {
    Group.hasMany(models.GroupCalendar, { foreignKey: "groupId" });
    Group.hasMany(models.Event, { foreignKey: "groupId" });
    Group.hasMany(model.GroupMember, { foreignKey: "groupId" });
    Group.belongsTo(model.User, { foreignKey: "organizerId" });
  };
  return Group;
};
