const express = require("express");
const User = require("../model/user");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const errorHandler = require("../middleware/error");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    console.log("user");
    console.log(req.file); // avatar
    console.log(req.body); // name, email, password

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error Deleting File." });
        } else {
          res.json({ message: "File deleted successfully." });
        }
      });
      return next(new errorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };
    console.log(user);
    //   const newUser = await User.create(user);
    //   res.status(201).json({
    //     success: true,
    //     newUser,
    //   });

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Activate Your Account",
        message: `Hello ${user.name}, Please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your mail: ${user.email} to activate your account.`,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new errorHandler(error.message, 400));
  }
});

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) return next(new errorHandler("Invalid Token", 400));

      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });
      if (user) return next(new errorHandler("User already exists", 400));

      user = await User.create({
        name,
        email,
        password,
        avatar,
      });
      sendToken(user, 201, res);
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  })
);

router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return next(
          new errorHandler("Please provide both email and password", 400)
        );

      const user = await User.findOne({ email }).select("+password");
      if (!user) return next(new errorHandler("User does not exist!", 400));

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid)
        return next(
          new errorHandler("Please provide the correct information", 400)
        );

      sendToken(user, 201, res);
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  })
);

module.exports = router;
