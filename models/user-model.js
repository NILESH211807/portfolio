const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const user_schema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

user_schema.methods.generateToken = async function () {

    try {
        return jwt.sign({
            id: this._id.toString(),
            phone: this.phone,
            email: this.email,
        }, process.env.JWT_KEY, {
            expiresIn: '30d',
        });
    } catch (error) {
        console.log(error.message);
    }
}

const User = mongoose.model('User', user_schema);
module.exports = User;