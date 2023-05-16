const db = require('../models');
const { Op } = require('sequelize');
const Users = db.users;
const Tenants = db.tenant;
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const { sequelize } = require('../models');


const authController = {
  register: async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const { name, email, password, phone_number, gender, birthdate, profileImage, role  } = req.body;
      const isExist = await Users.findOne({
        where: {
          [Op.or]: [
            
            {
              email: email,
            },
          ],
        },
      });

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
        verified: false,
        
      };

      const result = await Users.create({ ...data });
      await t.commit();

      const token = await jwt.sign(
        { ...result.dataValues },
        process.env.secret,
        {
          expiresIn: "5m",
        }
      );

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
        const token = jwt.sign({ email: result.email }, process.env.secret, {
          expiresIn: "2h",
        });


        return res.status(200).json({
          message: "user successfully logged in",
          result: { token, result },
        });
      }

    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  },

  keeplogin: async (req, res) => {
    console.log('tesstt');
    try {
      let token = req.headers.authorization;
      console.log(req.headers);
      let token2 = token.split(' ')[1]
      const decoded = jwt.verify(token2, process.env.secret);
      console.log(decoded);
      const newUser = await Users.findOne({
        where: {
          email:decoded.email
        }
      });
      delete newUser.dataValues.password;
      return res.status(200).json({
        message: "keep login fetched",
        result: newUser,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.toString(),
      });
    }
  },


  changePassword: async (req, res) => {
    const { oldPassword, newPassword, email } = req.body;
    
    console.log(req.user);
    const hashpassword = bcrypt.hashSync(newPassword, 10);
    await Users.update(
      {
        newPassword: hashpassword,
      },
      {
        where: {
          email: email,
        },
      }
    );
  },

  
  verifiedUser: async (req, res) => {
    try {
      const token = req.params.token;
      const data = await jwt.verify(token, process.env.secret);
      console.log(data);
      await Users.update(
        {
          verified: true,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
      return res.status(400).json({
        message: "verified",
      });
    } catch (err) {
      return res.status(400).json({
        message: err.toString(),
      });
    }
  },

  registerTenant: async (req, res) => {
    try {
      const { name, email, password, address, phone_number } = req.body;
      console.log('test');
      const existingTenant = await Tenants.findOne({ email });
      if (existingTenant) {
        return res.status(400).send({ message: 'Email is already registered' });
      }
  
      const tenant = await Tenants.create({ name, email, password, address, phone_number });
      await tenant.save();
  
      res.send({ message: 'Tenant registered successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Failed to register tenant' });
    }
  },
  
}


module.exports=authController;

