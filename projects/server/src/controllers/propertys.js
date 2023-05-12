const db = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');

const propertys = db.propertys;
const categories = db.categories;
const fasilities = db.fasilities;
const transaction = db.transaction;
const rooms = db.rooms;
const special_price = db.special_price;
const available_date = db.available_date;
const propertys_fasilities = db.propertys_fasilities;

const { sequelize } = require('../models');

const propertysController = {
  getPropertys: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await propertys.findAll({
        attributes: [
          'id',
          'name',
          'description',
          'propertyImage',
          'categories_id',
        ],
        include: [
          {
            model: categories,
            attributes: ['id', 'provinsi', 'kabupaten', 'kecamatan'],
          },
        ],

        // order: [['id', 'DESC']],
      });

      return res.status(200).json({
        message: 'fetched data propertys',
        result: result,
      });
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  },
  deletePropertys: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await propertys.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).json({
        message: 'property deleted',
        result: result,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: err,
      });
    }
  },
  getPropertyDetail: async (req, res) => {
    try {
      const id = req.params.id;

      console.log(id);

      const result = await propertys.findAll({
        attributes: [
          'id',
          'name',
          'description',
          'propertyImage',
          'categories_id',
        ],
        include: [
          {
            model: fasilities,
            through: propertys_fasilities,
            // attributes: ['property_id', 'fasility_id'],
          },
          {
            model: categories,
            attributes: ['id', 'provinsi', 'kabupaten', 'kecamatan'],
          },
        ],
        where: {
          id: id,
        },
      });
      // console.log(result.dataValues);

      return res.status(200).json({
        message: 'fetched data property detail',
        result: result,
      });
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: err,
      });
    }
  },

  getRoomsDetail: async (req, res) => {
    try {
      const id = req.params.id;

      // console.log(id);

      const result = await rooms.findAll({
        attributes: [
          'id',
          'name',
          'description',
          'roomImage',
          'status',
          'propertys_id',
          'available_date_id',
          'special_price_id',
        ],
        include: [
          {
            model: special_price,
            attributes: ['id', 'price', 's_price'],
          },
          {
            model: available_date,
            attributes: [
              'id',
              'start_date',
              'end_date',
              'nama_kenaikan_harga',
              'harga_kenaikan',
              'status',
            ],
          },
          {
            model: propertys,
            attributes: [
              'id',
              'name',
              'description',
              'propertyImage',
              'categories_id',
            ],
            where: {
              id: id,
            },

            include: [
              {
                model: categories,
                attributes: ['id', 'provinsi', 'kabupaten', 'kecamatan'],
              },
            ],
          },
        ],
        // group: ['propertys_id'],
      });
      // console.log(result.dataValues);

      return res.status(200).json({
        message: 'fetched data property detail',
        result: result,
      });
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: err,
      });
    }
  },
  addTransactionRoom: async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const { room_id, tgl_checkin, tgl_checkout } = req.body;

      // console.log('request:', req.body);

      const result = await transaction.create({
        room_id: room_id,
        order_status: 'Menunggu Pembayaran',
        tgl_checkin: tgl_checkin,
        tgl_checkout: tgl_checkout,
      });

      await rooms.update(
        {
          status: 'Booked',
        },
        {
          where: {
            id: room_id,
          },
          transaction: t,
        }
      );

      await t.commit();

      return res.status(201).json({
        message: 'new transaction added',
        result: result,
      });
    } catch (err) {
      await t.rollback();

      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  },

  getBookingList: async (req, res) => {
    try {
      const id = req.params.id;

      // console.log(id);

      const result = await transaction.findAll({
        attributes: [
          'id',
          'tgl_checkin',
          'tgl_checkout',
          'bukti_pembayaran',
          'order_status',
          'users_id',
          'reviews_id',
          'room_id',
        ],
        include: [
          {
            model: rooms,
            attributes: [
              'id',
              'name',
              'description',
              'roomImage',
              'status',
              'propertys_id',
              'available_date_id',
              'special_price_id',
            ],
            include: [
              {
                model: special_price,
                attributes: ['id', 'price', 's_price'],
              },
              {
                model: available_date,
                attributes: [
                  'id',
                  'start_date',
                  'end_date',
                  'nama_kenaikan_harga',
                  'harga_kenaikan',
                  'status',
                ],
              },
              {
                model: propertys,
                attributes: [
                  'id',
                  'name',
                  'description',
                  'propertyImage',
                  'categories_id',
                ],

                include: [
                  {
                    model: categories,
                    attributes: ['id', 'provinsi', 'kabupaten', 'kecamatan'],
                  },
                ],
              },
            ],
          },
        ],
        // group: ['propertys_id'],
      });
      return res.status(200).json({
        message: 'fetched data booking list',
        result: result,
      });
    } catch (err) {
      console.log(err);

      return res.status(400).json({
        message: err,
      });
    }
  },

  cancelTransaction: async (req, res) => {
    const { room_id } = req.body;
    try {
      // console.log('request:', req.body);
      const t = await sequelize.transaction();

      await transaction.update(
        {
          order_status: 'Dibatalkan',
        },
        {
          where: { room_id },
          transaction: t,
        }
      );

      // Update the room
      await rooms.update(
        {
          status: 'Available',
        },
        {
          where: { id: room_id },
          transaction: t,
        }
      );

      // Commit the transaction
      await t.commit();

      return res.status(201).json({
        message: 'Transaction cancelled successfully',
      });
    } catch (err) {
      await t.rollback();

      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  },

  testPay: async (req, res) => {
    const { room_id } = req.body;
    const imagePath = '/PaymentProof/';
    const image_url = imagePath + req.file.filename;
    const t = await sequelize.transaction();
    try {
      console.log(req.file.filename);
      const transactionRecord = await transaction.findOne({
        where: {
          room_id: room_id,
          [Op.or]: [
            { order_status: 'Menunggu Pembayaran' },
            { order_status: 'Menunggu Konfirmasi Pembayaran' },
          ],
        },
        transaction: t,
      });
      console.log(transactionRecord);

      if (!transactionRecord) {
        return res.status(404).json({
          message: 'Transaction record not found',
        });
      }

      // Remove previous image if it exists
      if (transactionRecord.bukti_pembayaran) {
        fs.unlinkSync(
          `${__dirname}/../public${transactionRecord.bukti_pembayaran}`
        );
      }

      const result = await transaction.update(
        {
          bukti_pembayaran: image_url,
          order_status: 'Menunggu Konfirmasi Pembayaran',
        },
        {
          where: {
            room_id: room_id,
            [Op.or]: [
              { order_status: 'Menunggu Pembayaran' },
              { order_status: 'Menunggu Konfirmasi Pembayaran' },
            ],
          },
          transaction: t,
        }
      );

      await t.commit();

      return res.status(201).json({
        message: 'Payment proof uploaded successfully',
        result: result,
      });
    } catch (err) {
      await t.rollback();

      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  },

  addPropertys: async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const { room_id, order_status, tgl_checkin } = req.body;

      // console.log('request:', req.body);

      const result = await transaction.create({
        room_id: room_id,
        order_status: 'Menunggu Pembayaran',
        tgl_checkin: tgl_checkin,
      });

      await rooms.update(
        {
          status: 'Booked',
        },
        {
          where: {
            id: room_id,
          },
          transaction: t,
        }
      );

      await t.commit();

      return res.status(201).json({
        message: 'new transaction added',
        result: result,
      });
    } catch (err) {
      await t.rollback();

      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  },
};

module.exports = propertysController;
