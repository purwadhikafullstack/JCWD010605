const db = require('../models');
const { Op } = require('sequelize');
const propertys = db.propertys;
const categories = db.categories;
const fasilities = db.fasilities;
const rooms = db.rooms;
const transaction = db.transaction;
const propertys_fasilities = db.propertys_fasilities;

const { sequelize, special_price, available_date } = require('../models');

const propertysController = {
  getPropertys: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await propertys.findAll({
        attributes: ['id', 'name', 'description', 'propertyImage', 'categories_id'],
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
        attributes: ['id', 'name', 'description', 'propertyImage', 'categories_id'],
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
      console.log(result.dataValues);

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

  // getRooms: async (req, res) => {
  //   try {
  //     const id = req.params.id;

  //     console.log(id);

  //     const result = await rooms.findAll({
  //       attributes: ['id', 'name', 'description', 'roomImage', 'status', 'propertys_id', 'available_date_id', 'special_price_id'],
  //       include: [
  //         {
  //           model: propertys,
  //           attributes: ['id', 'name', 'description', 'propertyImage', 'categories_id'],
  //           include: [
  //             {
  //               model: categories,
  //               attributes: ['id', 'provinsi', 'kabupaten', 'kecamatan'],
  //             },
  //           ],
  //         },
  //       ],
  //       group: ['propertys_id'],
  //     });
  //     console.log(result.dataValues);

  //     return res.status(200).json({
  //       message: 'fetched data property detail',
  //       result: result,
  //     });
  //   } catch (err) {
  //     console.log(err);

  //     return res.status(400).json({
  //       message: err,
  //     });
  //   }
  // },

  // getPropertyDetail: async (req, res) => {
  //   try {
  //     const id = req.params.id;

  //     console.log(id);

  //     const result = await rooms.findAll({
  //       attributes: ['id', 'name', 'description', 'roomImage', 'status', 'propertys_id', 'available_date_id', 'special_price_id'],
  //       include: [
  //         {
  //           model: propertys,
  //           attributes: ['id', 'name', 'description', 'propertyImage', 'categories_id'],
  //           where: {
  //             id: id,
  //           },

  //           include: [
  //             {
  //               model: categories,
  //               attributes: ['id', 'provinsi', 'kabupaten', 'kecamatan'],
  //             },
  //           ],
  //         },
  //       ],
  //       // group: ['propertys_id'],
  //     });
  //     // console.log(result.dataValues);

  //     return res.status(200).json({
  //       message: 'fetched data property detail',
  //       result: result,
  //     });
  //   } catch (err) {
  //     console.log(err);

  //     return res.status(400).json({
  //       message: err,
  //     });
  //   }
  // },

  getRoomsDetail: async (req, res) => {
    try {
      const id = req.params.id;

      console.log(id);

      const result = await rooms.findAll({
        attributes: ['id', 'name', 'description', 'roomImage', 'status', 'propertys_id', 'available_date_id', 'special_price_id'],
        include: [
          {
            model: special_price,
            attributes: ['id', 'price', 's_price'],
          },
          {
            model: available_date,
            attributes: ['id', 'start_date', 'end_date', 'nama_kenaikan_harga', 'harga_kenaikan', 'status'],
          },
          {
            model: propertys,
            attributes: ['id', 'name', 'description', 'propertyImage', 'categories_id'],
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
      const { roomIds } = req.body;

      const result = await transaction.create(
        {
          ...req.body,
          roomIds: JSON.stringify(roomIds),
        },
        { transaction: t }
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

      console.log(id);

      const result = await transaction.findAll({
        attributes: ['id', 'tgl_checkin', 'tgl_checkout', 'bukti_pembayaran', 'order_status', 'users_id', 'reviews_id', 'room_id'],
        include: [
          {
            model: rooms,
            attributes: ['id', 'name', 'description', 'roomImage', 'status', 'propertys_id', 'available_date_id', 'special_price_id'],
            include: [
              {
                model: special_price,
                attributes: ['id', 'price', 's_price'],
              },
              {
                model: available_date,
                attributes: ['id', 'start_date', 'end_date', 'nama_kenaikan_harga', 'harga_kenaikan', 'status'],
              },
              {
                model: propertys,
                attributes: ['id', 'name', 'description', 'propertyImage', 'categories_id'],

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
};

module.exports = propertysController;
