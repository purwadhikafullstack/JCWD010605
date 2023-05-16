'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction.init(
    {
      tgl_checkin: DataTypes.DATE,
      tgl_checkout: DataTypes.DATE,
      bukti_pembayaran: DataTypes.STRING,
      order_status: DataTypes.STRING,
      payment_deadline: DataTypes.DATE,
      users_id: DataTypes.INTEGER,
      reviews_id: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'transaction',
    }
  );
  return transaction;
};
