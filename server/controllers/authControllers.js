const User = require("../models/user");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendTokenAndResData = async (res, statusCode, user) => {
  const token = await createToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY_DATE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });
  sendTokenAndResData(res, 201, newUser);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("email and  password reqiured"));
  }

  const incomingUser = await User.findOne({ email: email }).select("+password");
  if (!incomingUser) {
    return next(new AppError("This user does not exist"));
  }

  if (!(await incomingUser.passwordCheck(password, incomingUser))) {
    return next(new AppError("Incorrect Password, Pls try again"));
  }

  sendTokenAndResData(res, 200, incomingUser);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  console.log(req.cookies, req.SignedCookies);
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
    console.log("token 1 " + token);
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Get token from header
    token = req.headers.authorization.split(" ")[1];
    console.log("token 2 " + token);
  }

  if (!token) {
    return next(
      new AppError(
        "you are not logged in please log in to view this resource",
        401
      )
    );
  }

  const decodedPayload = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const incomingUser = await User.findById(decodedPayload.id);
  if (!incomingUser)
    return next(new AppError("This user no longer exists", 401));

  req.user = incomingUser;
  return next();
});

exports.logout = (req, res, next) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY_DATE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.clearCookie("jwt", cookieOptions);
  res.status(200).json({
    meassge: "user logged out",
    status: "success",
  });
};
