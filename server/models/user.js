const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please provide a First Name"],
      minLength: 4,
    },
    lastName: {
      type: String,
      required: [true, "please provide a Last Name"],
      minLength: 4,
    },
    email: {
      type: String,
      required: [true, "please provide an email"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "please provide a valid email",
      },
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
      minLength: [8, "password must be atleast a characters"],
      validate: {
        validator: validator.isStrongPassword,
        message:
          "password must contain a uppercase, lowercase, number and a symbol.",
      },
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "please confirm your password"],
      validate: {
        // only works for SAVE and CREATE method
        validator: function (el) {
          return el === this.password;
        },
        message: "password and passwordConfirm value do not match",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  console.log("presave middleware");

  if (!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password, 12);
  this.passwordConfirm = undefined;
  console.log(this.password);
  next();
});

userSchema.method({
  passwordCheck: async function (incomingPwd) {
    return await bcryptjs.compare(incomingPwd, this.password);
  },
});

module.exports = mongoose.model("user", userSchema);
