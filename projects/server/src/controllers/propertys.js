const db = require('../models');
const { Op } = require('sequelize');
const propertys = db.propertys;
const categories = db.categories;

const { sequelize } = require('../models');

const propertysController = {
  addProperty: async (req, res) => {
    try {
      const {name, description, propertyImage} = req.body 

      await propertys.create({
        name, description, propertyImage
      })
      
      const result = await propertys.findAll({
        attributes: ['id', 'name', 'description', 'propertyImage', 'categories_id'],
      });

      return res.status(200).json({
        message: 'fetched data propertys',
        result: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: err,
      })
    }
  },
    getPropertys: async (req, res) => {
      try {
        // const id = req.params.id;

        const result = await propertys.findAll({
          attributes: ['id', 'name', 'description', 'propertyImage', 'categories_id'],
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


