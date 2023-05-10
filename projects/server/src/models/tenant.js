'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tenants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tenants.init({
    no_ktp: DataTypes.INTEGER,
    ktp_image: DataTypes.STRING,
    users_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tenant',
  });
  return Tenants;
};