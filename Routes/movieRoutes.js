const express = require("express");
const {
  getHighestRated,
  getAllMovies,
  postMovie,
  getSingleMovie,
  patchMovie,
  deleteMovie,
  getStats,
  getBy,
  test,
} = require("../Controllers/moviesControllers.js");

// const { checkId } = require("../Controllers/moviesControllers");

const router = express.Router();

// router.param("id", checkId);

router.route("/get-stats").get(getStats);

router.route("/get-by").get(getBy);

router.route("/test").get(test);

router.route("/").get(getAllMovies).post(postMovie);

router.route("/:id").get(getSingleMovie).patch(patchMovie).delete(deleteMovie);

module.exports = router;
