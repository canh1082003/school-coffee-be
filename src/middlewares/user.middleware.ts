import { checkSchema } from "express-validator";
const RegisterMiddleware = checkSchema({
  firstName: {
    notEmpty: true,
    errorMessage: "First name is required",
  },
  lastName: {
    notEmpty: true,
    errorMessage: "Last name is required",
  },
  email: {
    isEmail: { errorMessage: "Please enter an email address" },
    notEmpty: { errorMessage: "Email is required" },
  },

  password: {
    isString: true,
    notEmpty: { errorMessage: "Password is required" },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
  role: {
    isIn: {
      options: ["user", "admin", "shipper"],
      errorMessage: "Role must be 'user' or 'admin' or 'shipper'",
    },
    notEmpty: { errorMessage: "Role is required" },
  },
  confirmPassword: {
    isString: true,
    notEmpty: { errorMessage: "Confirm password is required" },
  },
});

const LoginMiddleware = checkSchema({
  email: {
    isEmail: { errorMessage: "Please enter an email address" },
    notEmpty: { errorMessage: "Email is required" },
  },
  password: {
    isString: true,
    notEmpty: { errorMessage: "Password is required" },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
});
const GetVerifyEmailTokenMiddleWare = checkSchema({
  verifyEmailToken: {
    notEmpty: { errorMessage: "Verify Email Token is required" },
  },
});
export { RegisterMiddleware, LoginMiddleware, GetVerifyEmailTokenMiddleWare };
