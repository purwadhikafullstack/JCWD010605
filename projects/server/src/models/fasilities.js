'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fasilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fasilities.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fasilities',
  });
  return fasilities;
};