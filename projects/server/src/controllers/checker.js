const db = require('../models');
const { Op } = require('sequelize');

const transaction = db.transaction;
const rooms = db.rooms;

const { sequelize } = require('../models');

async function checkTransactions() {
  try {
    // Get the current time minus 2 hours
    // const twoHoursAgo = new Date();
    // twoHoursAgo.setHours(twoHoursAgo.getHours() - 1);

    // Get the current time minus 2 minutes
    const now = new Date();
    now.setMinutes(now.getMinutes() - 1); // subtract 30 minutes
    // now.setSeconds(now.getSeconds() - 30); // subtract 30 minutes

    // Find any transactions that were created more than 2 hours ago and haven't had a payment proof uploaded
    const transactionsToCancel = await transaction.findAll({
      where: {
        createdAt: { [Op.lt]: now },
        bukti_pembayaran: null,
        order_status: 'Menunggu Pembayaran',
      },
    });

    console.log(12123141412312312, transactionsToCancel);
    // Cancel any transactions that were found
    for (const transaction of transactionsToCancel) {
      // Update the transaction status to 'cancelled'
      await transaction.update({ order_status: 'Dibatalkan' });

      const roomId = transaction.room_id;
      const room = await rooms.findByPk(roomId);

      // Update the room status to 'Available'
      await room.update({ status: 'Available' });

      // Here you can put any code to notify the user that their transaction has been cancelled
      console.log(`Transaction ${transaction.id} has been cancelled`);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = { checkTransactions };
