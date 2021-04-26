'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupCalendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  GroupCalendar.init({
    eventId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GroupCalendar',
  });
  return GroupCalendar;
};