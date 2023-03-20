'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class propertys_fasilities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  propertys_fasilities.init(
    {},
    {
      sequelize,
      modelName: 'propertys_fasilities',
      timestamps: false,
    }
  );
  return propertys_fasilities;
};
