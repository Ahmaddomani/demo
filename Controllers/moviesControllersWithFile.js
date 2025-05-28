const { log } = require("console");

const fs = require("fs");

const jsonFile = fs.readFileSync("./Data/movies.json", "utf-8");

let movies = JSON.parse(jsonFile);

exports.checkId = (req, res, next, value) => {
  log(`The ID is ${value}`);

  const movie = movies.find((movie) => movie.id === value * 1);

  if (!movie) {
    return res.status(404).send("There is no such movie");
  }
  next();
};

// Create Req/Res Functions

//? Get All Movies function
exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: "success", // It is good to send status
    count: movies.length,
    data: {
      // add data first
      movies: movies,
    },
  });
};

//? Get Single Movie function
exports.getSingleMovie = (req, res) => {
  const id = +req.params.id;
  const movie = movies.find((movie) => movie.id == id);

  // if (!movie) {
  //   res.status(200).send("There is no such movie ");
  // }

  res.status(200).json({
    status: "success",
    dataTime: req.RequestedAt,
    data: { movie },
  });
};

//? Post New Movie function
exports.postMovie = (req, res) => {
  // Check if the movie Name is existed
  const isExisted = movies.some((item) => {
    return item.moviesName.trim() == req.body.moviesName.trim();
  });
  // Send the Movie Name if it is not existed
  if (!isExisted) {
    const newItem = Object.assign({ id: +movies.at(-1).id + 1 }, req.body);
    movies.push(newItem);
    fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
      if (err) {
        res
          .status(500)
          .json({ status: "error", message: "Filed To save movie" });
      }
      res.status(201).json({
        status: "success",
        data: {
          movie: newItem,
        },
      });
    });
    // Send The Movie is existed if the Movie name existed
  } else {
    res.status(409).send("The movie already exists");
  }
};

//? Patch On Movie function
exports.patchMovie = (req, res) => {
  const id = +req.params.id;

  const movie = movies.find((movie) => movie.id == id);

  // if (!movie) {
  //   return res.status(404).send("There is no such movie to update ");
  // }

  const index = movies.indexOf(movie);

  const newOne = Object.assign(movie, req.body);

  movies[index] = newOne;

  fs.writeFile("./Data/movies.json", JSON.stringify(movies), (err) => {
    res.status(200).json({
      status: "success",
      data: newOne,
    });
  });
};

//? Delete Movie function
exports.deleteMovie = (req, res) => {
  const id = req.params.id;

  const movie = movies.find((movie) => movie.id == id);

  // if (!movie) {
  //   return res.status(404).send("There is no such movie to Delete ");
  // }

  const afterDelete = movies.filter((one) => {
    return one !== movie;
  });

  movies = afterDelete;

  fs.writeFile("./Data/movies.json", JSON.stringify(movies), () => {
    res.status(204);
  });
};
