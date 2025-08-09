const express = require("express");
const errorHandler = require("./utils/errorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload({ useTempFiles: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/", express.static("uploads"));

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

const user = require("./controller/user");
app.use("/api/v2/user", user);

app.use(errorHandler);

module.exports = app;
