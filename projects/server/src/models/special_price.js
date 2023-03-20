'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class special_price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  special_price.init({
    price: DataTypes.INTEGER,
    s_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'special_price',
  });
  return special_price;
};