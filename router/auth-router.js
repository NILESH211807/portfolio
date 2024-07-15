const express = require("express");
const router = express.Router();
const auth_controllers = require('../controllers/auth-controllers');
const { reg_schema, login_schema } = require('../validation/auth-validater');
const validate = require("../middleware/validate");

router.route('/register').post(
    validate(reg_schema), auth_controllers.register
);

router.route('/login').post(
    validate(login_schema), auth_controllers.login
)

module.exports = router;