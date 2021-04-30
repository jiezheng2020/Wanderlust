"use strict";

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      eventId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      body: DataTypes.TEXT,
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: "userId" });
    Comment.belongsTo(models.Event, { foreignKey: "eventId" });
  };
  return Comment;
};
