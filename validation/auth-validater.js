const { z } = require("zod");

const reg_schema = z.object({
   userName: z
      .string({ required_error: "name is required" })
      .trim()
      .min(1, { message: "name is required" })
      .min(3, { message: "name min 3 character" })
      .max(12, { message: "name max 12 character" }),
   phone: z
      .string({ required_error: "phone is required" })
      .trim()
      .min(1, { message: "phone is required" })
      .min(10, { message: "invalid phone number" })
      .max(10, { message: "invalid phone number" }),
   email: z
      .string({ required_error: "email is required" })
      .trim()
      .min(1, { message: "email is required" })
      .email({ message: "please enter valid email" }),
   password: z
      .string({ required_error: "password is required" })
      .trim()
      .min(1, { message: "password is required" })
      .min(6, { message: "password length min 6" })
      .max(22, { message: "password length max 22" })
});


const login_schema = z.object({
   phone: z
      .string({ required_error: "phone is required" })
      .trim()
      .min(1, { message: "phone is required" })
      .min(10, { message: "invalid phone number" })
      .max(10, { message: "invalid phone number" }),
   password: z
      .string({ required_error: "password is required" })
      .trim()
      .min(1, { message: "password is required" })
      .min(6, { message: "password length min 6" })
      .max(22, { message: "password length max 22" })
});

module.exports = { reg_schema, login_schema };