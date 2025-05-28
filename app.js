const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const router = require("./Routes/movieRoutes");
const dotENv = require("dotenv");
const mongoose = require("mongoose");
const { log } = require("console");
const Movie = require("./mdoels/movieModal");
const CustomError = require("./Utilts/CustomError");
const GlobalErrorHandler = require("./Controllers/GlobalErrorHandler");

//  ? -----------------------------Start With Express ------------------------------
const app = express();

// Get Environment variables After adding Them in config.env

// For Get the Vars from config.env to nodejs environment
dotENv.config({ path: "./config.env" });

const Port = +process.env.PORT || 3000;

// const env = process.env.NODE_ENV;

//  ?! Connect to remote dataBase
// And you got the CONN_STRING from atlas database
mongoose
  .connect(process.env.CONN_STRING)
  .then((conn) => {
    // console.log(conn);
    console.log("Db Connected");
  })
  .catch((error) => console.log(error));

// const testMovie = new Movie({
//   name: "mohammed",
//   duration: 200,
//   rating: 4.5,
// });

// test to take Movies from json File

// !  the movie Will be created in the controllers page when the user asks for a page or post from the frontend

// testMovie
//   .save()
//   .then(() => {
//     log("The Movie has been added to the dataBase");
//   })
//   .catch((err) => log(err));

//  ?! Connect to local dataBase

// ! you got the url to this local database when you use mongosh or  the default is monogodb://locahost:27017/

// mongoose
//   .connect(process.env.LOCAL_CONN_STR)
//   .then((conn) => {
//     // console.log(conn);
//     console.log("Db Connected");
//   })
//   .catch((error) => console.log(error));

// ! Just for ejs files
app.set("view engine", "ejs");

// log(process.env); // Node Environments Variables

// const accessLogStream = fs.createWriteStream("./Data/Log.log", { flags: "a" });

app.use(express.json()); // Define the json so we can console it

// app.use(morgan(env || "dev", { stream: accessLogStream }));

// app.use(express.static("./views")); // for static files but i don't know how to render it just like ejs

app.get("/demo", (req, res) => {
  res.render("demo");
});

app.use("/api/movies", router);

// ! I Don't Know Why This wasn't Work so i used the just (use(req,res)) instead of it in the line 89 or +-1 Line
// ! The Problem was because of the express version so i solve it by install an old one
// ? not Found page Error
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "Failed",
  //   message: `Sorry We Can't Find The Url ${req.originalUrl} That You Have Asked For on The Server`,
  // });
  //! i have created a class for this one
  // const err = new Error(
  //   `Sorry We Can't Find The Url ${req.originalUrl} That You Have Asked For on The Server`
  // );
  // err.status = "fail";
  // err.statusCode = 404

  const err = new CustomError(
    `Sorry We Can't Find The Url ${req.originalUrl} That You Have Asked For on The Server`,
    404
  );

  next(err);
});

// Global Error Handling
app.use(GlobalErrorHandler);

app.listen(Port, "localhost", () => {
  console.log("Server Is listening .....");
});
