// import jwt from "jsonwebtoken";

const db = require('../models');
const { Op } = require('sequelize');
const Users = db.users;
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

const { sequelize } = require('../models');

const authController = {
  register: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { name, email, password, phone_number, gender, birthdate, profileImage, role  } = req.body;
      //cek email
      const isExist = await Users.findOne({
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

      const result = await Users.create({ ...data });
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

  // login: async (req, res) => {
  //   const t = await sequelize.transaction();
  //   try {
  //     console.log(req.body);
  //     const { email, password } = req.body;
      
  //     const isExist = await Users.findOne({
  //       where: {
  //         [Op.and]: [
            
  //           {
  //             email: email
  //           },
  //           {
  //             password: password
  //           }
  //         ],
  //       },
  //     });

  //     console.log(isExist);

  //     if (isExist) {
  //       throw new Error('email already registered');
  //     }

  //     const hashPassword = bcrypt.hashSync(password, 10);
  //     const data = {
  //       name,
  //       email,
  //       password: hashPassword,
  //       phone_number,
  //       gender,
  //       birthdate,
  //       profileImage,
  //       role: "user",
        
  //     };

  //     const result = await Users.create({ ...data });
  //     delete result.dataValues.password;

  //     await t.commit();

  //     return res.status(201).json({
  //       message: 'login successfully',
  //       result: result,
  //     });
  //   } catch (err) {
  //     await t.rollback();

  //     console.log(err);
  //     res.status(400).json({
  //       message: err.toString(),
  //     });
  //   }
  // },

  

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email);
      console.log(password);

      const result = await Users.findOne({
        where: { email }, raw: true
      });

      const match = await bcrypt.compare(password, result.password)
      if(!match) return res.status(400).json({msg: "Wrong Password"});

      if (result.email) {
        return res.status(200).json({
          message: "user successfully logged in",
          result: result,
        });
      }
      // return res.status(400).json({
      //   message: "user failed logged in",
      // });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  },

  // login: async (req,res) => {
  //   try {
  //     const users = await users.findOne({
  //       where:{
  //         email: req.body.email
  //       }
  //     });
  //     const match = await bcrypt.compare(req.body.password, users[0].password)
  //     if(!match) return res.status(400).json({msg: "Wrong Password"});
  //     const usersId = users[0].id
  //     const name = users[0].name
  //     const email = email[0].email
  //     const accessToken = jwt.sign({usersId,name,email}, process.env.ACCESS_TOKEN_SECRET, {
  //       expiresIn: '20s'
  //     })
  //     const refreshToken = jwt.sign({usersId,name,email}, process.env.REFRESH_TOKEN_SECRET, {
  //       expiresIn: '1d'
  //     })
  //     await users.update({refresh_token: refreshToken}, {
  //       where : {
  //         id: usersId
  //       }
  //     })
  //     res.cookie('refreshToken', refreshToken, {
  //       httpOnly: true,
  //       maxAge: 24 * 60 * 60 * 1000
  //     })
  //     res.json({ accessToken})

  //     const result = await users.create({ ...data });

  //     await users.commit();

  //     return res.status(201).json({
  //       message: 'new user registered',
  //       result: result,
  //     });

  //   } catch (error) {
  //     res.status(404).json({msg:"Email tidak ditemukan"})
      
  //   }
  // }

  // deleteUsers: async(req, res)=>{
  //   try {
  //     const id = req.params.id;

  //     await users.destroy({

  //       where: {
  //         id: id
  //       }
  //     });
  //     return res.status(200).json({
  //       message: 'fetched data users',
  //       result: result,
  //     });
  //   } catch (err) {
  //     return res.status(400).json({
  //       message: err,
  //     });
  //   }
  // },

  // getUsers: async (req, res) => {
  //   try {
  //     const id = req.params.id;

  //     const result = await users.findAll({
  //       attributes: ['id', 'name', 'email', 'phone_number', 'gender', 'birthdate', 'profileImage', 'role'],
        

  //       order: [['id', 'DESC']],
  //     });

  //     return res.status(200).json({
  //       message: 'fetched data users',
  //       result: result,
  //     });
  //   } catch (err) {
  //     return res.status(400).json({
  //       message: err,
  //     });
  //   }
  // },
}




module.exports=authController;

