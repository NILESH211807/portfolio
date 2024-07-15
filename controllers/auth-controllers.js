const User = require('../models/user-model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
   try {
      const { userName, phone, email, password } = req.body;
      // check mobile exists
      const mobileCheck = await User.findOne({ phone: phone });
      // check mobile exists
      const emailCheck = await User.findOne({ email: email });
      if (mobileCheck) {
         res.status(500).json({ message: 'phone already registered' });
      }
      else if (emailCheck) {
         res.status(500).json({ message: 'email already registered' });
      }
      else {

         bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
               // create new user 
               const user_created = await User.create({
                  userName: userName,
                  phone: phone,
                  email: email,
                  password: hash
               });

               const token = await user_created.generateToken();
               res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

               res.status(200).json({
                  message: 'account created successfully',
                  data: user_created,
                  token: await user_created.generateToken(),
               });

            })
         })
      }
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
}

// login 
const login = async (req, res) => {
   const { phone, password } = req.body;
   // phone check 
   const user_data = await User.findOne({ phone: phone });

   if (!user_data) {
      res.status(404).json({ message: "phone is not registered" });
   } else {
      bcrypt.compare(password, user_data.password, async function (err, result) {
         if (result) {

            const token = await user_data.generateToken();

            res.cookie('token', token, {
               expires: new Date((Date.now() + 25892000000)),
               httpOnly: true
            });

            res.status(200).json({
               message: "login successful",
               data: user_data,
               token: token,
               userId: user_data._id.toString(),
            });

         }
         else {
            res.status(401).json({ message: "invalid password" });
         }
      })
   }
}

module.exports = { register, login };