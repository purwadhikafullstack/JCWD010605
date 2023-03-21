'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class available_date extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  available_date.init({
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    nama_kenaikan_harga: DataTypes.STRING,
    harga_kenaikan: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'available_date',
  });
  return available_date;
};