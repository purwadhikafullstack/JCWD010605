const db = require('../models');
const { Op } = require('sequelize');
const Users = db.users;
const Tenants = db.tenant;
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
// const auth = require('../middlewares/auth')
// const validationSchema = require('../validators/changePasswordValidator')
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');



const { sequelize } = require('../models');


// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'underdogkel5@gmail.com',
//     pass: '@underdog666',
//   },
// });

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

  keeplogin: async (req, res) => {
    console.log('tesstt');
    try {
      let token = req.headers.authorization;
      console.log(req.headers);
      let token2 = token.split(' ')[1]
      
      // token = token.split(" ")[1];
      const decoded = jwt.verify(token2, process.env.secret);
      console.log(decoded);
      // console.log(oldUser);
      const newUser = await Users.findOne({
        where: {
          email:decoded.email
        }
      });

      // delete newUser.dataValues.avatar_buffer;
      delete newUser.dataValues.password;

      // console.log("test");

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

  // changePassword: async (req, res) => {
  //   const { oldPassword, newPassword, email } = req.body ;
  
  //   // Check that both oldPassword and newPassword are provided
  //   if (!oldPassword || !newPassword) {
  //     return res.status(400).json({ error: 'Both oldPassword and newPassword are required' });
  //   }
  
  //   try {
  //     const user = await Users.findOne({ where: { email: email} });
  
  //     // Check that the old password is correct
  //     const isMatch = await bcrypt.compare(oldPassword, user.password);
  //     if (!isMatch) {
  //       return res.status(401).json({ error: 'Invalid old password' });
  //     }
  
  //     // Hash the new password and update the database
  //     const hashedPassword = await bcrypt.hash(newPassword, 10);
  //     await user.update({ password: hashedPassword });
  
  //     return res.status(200).json({ message: 'Password updated successfully' });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: 'Server error' });
  //   }
  // },


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

  // changePassword: async (req, res) => {
  //   const { oldPassword, newPassword } = req.body;
  
  //   // if (!email) {
  //   //   return res.status(400).json({ message: 'Email is required' });
  //   // }
  
  //   const user = await Users.findOne({
  //     where: {
  //       email: req.user.email,
  //     },
  //   });
  
  //   if (!user) {
  //     return res.status(400).json({ message: 'User not found' });
  //   }
  
  //   if (!bcrypt.compareSync(oldPassword, user.password)) {
  //     return res.status(400).json({ message: 'Old password is incorrect' });
  //   }
  
  //   const hashedPassword = bcrypt.hashSync(newPassword, 10);
  
  //   await Users.update(
  //     {
  //       password: hashedPassword,
  //     },
  //     {
  //       where: {
  //         email: email,
  //       },
  //     }
  //   );
  
  //   res.status(200).json({ message: 'Password changed successfully' });
  // },
  
  

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
  

  // resetPassword: async (req, res) => {
  //   try {
  //     const { email } = req.body;

  //     const user = await Users.findOne({ email });

  //     if (!user) {
  //       return res.status(404).json({ message: 'User not found' });
  //     }

  //     const token = crypto.randomBytes(32).toString('hex');
  //     user.resetToken = token;
  //     user.resetTokenExpiration = Date.now() + 3600000; // token expires in 1 hour
  //     await user.save();

  //     const mailOptions = {
  //       from: 'example@gmail.com',
  //       to: email,
  //       subject: 'Reset Password',
  //       html: `
  //         <p>You requested a password reset</p>
  //         <p>Click this <a href="http://localhost:3000/reset-password/${token}">link</a> to set a new password</p>
  //       `,
  //     };

  //     transporter.sendMail(mailOptions, (error, info) => {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         console.log(`Email sent: ${info.response}`);
  //       }
  //     });

  //     res.status(200).json({ message: 'Reset password email sent' });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // },

  // newPassword: async (req, res) => {
  //   try {
  //     const { token } = req.params;
  //     const { password } = req.body;

  //     const user = await Users.findOne({
  //       resetToken: token,
  //       resetTokenExpiration: { $gt: Date.now() },
  //     });

  //     if (!user) {
  //       return res.status(404).json({ message: 'Invalid token' });
  //     }

  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     user.password = hashedPassword;
  //     user.resetToken = undefined;
  //     user.resetTokenExpiration = undefined;
  //     await user.save();

  //     res.status(200).json({ message: 'Password reset successfully' });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // },



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

