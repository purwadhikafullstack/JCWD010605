const db = require('../models');
const { Op } = require('sequelize');
const propertys = db.propertys;
const { sequelize } = require('../models');

const propertysController = {
  getPropertys: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await propertys.findAll({
        attributes: ['id', 'name', 'description', 'propertyImage', 'categories_id'],

        order: [['id', 'DESC']],
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
};

module.exports = propertysController;
