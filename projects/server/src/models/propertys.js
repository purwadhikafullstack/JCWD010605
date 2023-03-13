'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class propertys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  propertys.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    propertyImage: DataTypes.STRING,
    categories_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'propertys',
  });
  return propertys;
};