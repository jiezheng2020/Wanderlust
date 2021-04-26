"use strict";
module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define(
    "GroupMember",
    {
      groupId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  GroupMember.associate = function (models) {
    // associations can be defined here
  };
  return GroupMember;
};
