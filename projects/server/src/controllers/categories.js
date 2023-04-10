const db = require('../models');
const { Op } = require('sequelize');
const propertys = db.propertys;
const categories = db.categories;

const { sequelize } = require('../models');

const categoriesController = {
    getCategories: async (req, res) => {
        try {

            const result = await categories.findAll({
                attributes: ['id', 'provinsi', 'kabupaten', 'kecamatan']
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

module.exports = categoriesController;
