const db = require('../models');
const { Op } = require('sequelize');
const users = db.users;
const bcrypt = require('bcrypt')

const { sequelize } = require('../models');

const authController = {
  register: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      console.log(req.body);

      const { name, email, password, phone_number, gender, birthdate, profileImage, role  } = req.body;
      //cek email
      const isExist = await users.findOne({
        where: {
          [Op.or]: [
            
            {
              email: email,
            },
          ],
        },
      });

      // console.log(isExist);

      if (isExist) {
        throw new Error('email already registered');
      }

      const hashPassword = bcrypt.hashSync(password, 10);
      const data = {
        name,
        email,
        password: hashPassword,
        phone_number,
        gender,
        birthdate,
        profileImage,
        role: "user",
        
      };

      const result = await users.create({ ...data });
      // delete result.dataValues.password;

      //data
      //secret key
      // const token = await jwt.sign({ ...result.dataValues }, process.env.secret, {
      //   expiresIn: '5m',
      // });
      await t.commit();

      return res.status(201).json({
        message: 'new user registered',
        result: result,
      });
    } catch (err) {
      await t.rollback();

      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },

  getUsers: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await users.findAll({
        attributes: ['id', 'name', 'email', 'phone_number', 'gender', 'birthdate', 'profileImage', 'role'],
        

        order: [['id', 'DESC']],
      });

      return res.status(200).json({
        message: 'fetched data users',
        result: result,
      });
    } catch (err) {
      return res.status(400).json({
        message: err,
      });
    }
  },
}


module.exports=authController;

