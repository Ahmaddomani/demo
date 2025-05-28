const mongoose = require("mongoose");
const fs = require("fs");
const { log } = require("console");
const Movie = require("../mdoels/movieModal");

const dotEnv = require("dotenv");

// This is important to access to the environment
dotEnv.config({ path: "./config.env" });

/// Read The Movies From The Json File
const mvoiesFromJson = JSON.parse(
  fs.readFileSync("./Data/movies.json", "utf-8")
);

// Connect to the DataBase
mongoose
  .connect(process.env.CONN_STRING, {})
  .then(() => log("Every Thing is Good"))
  .catch(() => log("There is an Error"));

// create the import data Method
const importData = async () => {
  try {
    await Movie.create(mvoiesFromJson);
    log("The Movies Have Been Added");
  } catch (error) {
    log(error.message);
  }
  process.exit();
};

// create the delete data Method
const deleteAllData = async () => {
  try {
    await Movie.deleteMany();
    log("The Movies Have Been Removed");
  } catch (error) {
    log(error.message);
  }
  process.exit();
};

if (process.argv[2] === "--import".trim()) importData();
if (process.argv[2] === "--delete".trim()) deleteAllData();
