'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rooms.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    roomImage: DataTypes.STRING,
    status: DataTypes.STRING,
    propertys_id: DataTypes.INTEGER,
    available_date_id: DataTypes.INTEGER,
    special_price_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rooms',
  });
  return rooms;
};