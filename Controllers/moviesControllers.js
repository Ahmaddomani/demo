const Movie = require("../mdoels/movieModal");

const apiFeatures = require("../Utilts/apiFeatures");
const CustomError = require("../Utilts/CustomError");
const asyncErorrhandler = require("../Utilts/asyncErrorHandel");
//! Create Req/Res Functions

// const asyncErorrhandler = (Routefunc) => {
//   return (req, res, next) => {
//     Routefunc(req, res, next).catch((err) => next(err));
//   };
// };

//? Get All Movies function
exports.getAllMovies = asyncErorrhandler(async (req, res, next) => {
  // Notice That i will take the old codes (apiFeatures) to oldFeatures File In the same root just for cleaning
  // You can just copy them from there and paste the instead of this class
  const Feature = new apiFeatures(Movie.find(), req.query)
    .filter()
    .sort()
    .fields()
    .paginate();
  //
  // .fields()
  // .paginate();

  const movies = await Feature.query;

  res.status(200).json({
    length: movies.length,
    status: "success",
    data: movies,
  });
});

//? Get Single Movie function
exports.getSingleMovie = asyncErorrhandler(async (req, res, next) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  if (!movie) {
    return next(
      new CustomError("The Movie you are Looking for is not existed", 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: movie,
  });
});

//? Post New Movie function
exports.postMovie = asyncErorrhandler(async (req, res, next) => {
  await Movie.create(req.body);
  res.status(201).json({
    status: "success",
    data: req.body,
  });
});

//? Patch On Movie function
exports.patchMovie = asyncErorrhandler(async (req, res, next) => {
  const id = req.params.id;
  const updatedMovie = await Movie.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true, // so you can check on the validations
  });
  if (!updatedMovie) {
    return next(
      new CustomError("The Movie you are Looking for is not existed", 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: updatedMovie,
  });
});

exports.getStats = asyncErorrhandler(async (req, res, next) => {
  const status = await Movie.aggregate([
    // { $match: { releaseYear: { $lte: new Date().getFullYear() } } }, // so if we want to do this for many endpoint
    // it will takes so many code so we do it using aggregate middleware => in MovieModal file
    { $match: { rating: { $gte: 4.5 } } },
    {
      $group: {
        _id: "$releaseYear",
        avgRating: {
          $avg: "$rating",
        },
        MoviesCount: {
          $sum: 1,
        },
        avgPrice: {
          $avg: "$price",
        },
        minPrice: {
          $min: "$price",
        },
        maxPrice: {
          $max: "$price",
        },
        Total_Price: {
          $sum: "$price",
        },
      },
    },
    { $sort: { minPrice: 1 } },
    // { $match: { maxPrice: { $gte: 15 } } },
  ]);
  res.status(200).json({
    status: "success",
    count: status.length,
    data: { status },
  });
});

exports.getBy = async (req, res) => {
  try {
    const moviesBy = await Movie.aggregate([
      {
        $unwind: "$genres",
      },
      {
        $group: {
          _id: "$genres",
          movieCount: { $sum: 1 },
          movie: { $push: "$name" },
        },
      },
      {
        $addFields: { genres: "$_id" },
      },
      //this means i don't want _id to be show
      {
        $project: { _id: 0 },
      },
      {
        $sort: { movieCount: -1 },
      },
      // {
      //   $limit: 6,
      // },
      {
        $match: { genres: "Action" },
      },
    ]);
    res.status(200).json({
      status: "success",
      count: moviesBy.length,
      data: { moviesBy },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};
exports.test = async (req, res) => {
  try {
    const movies = await Movie.aggregate([
      // { $match: { rating: { $gt: 5 } } },
      // { $unwind: "$actors" },
      // { $project: { __v: 0, _id: 0 } },
      {
        $facet: {
          Total: [{ $count: "count" }],
          above7: [{ $match: { rating: { $gte: 8.5 } } }, { $count: "count" }],
        },
      },
      // {
      //   $group: {
      //     _id: "$rating",
      //     count: { $count: 1 },
      //     // MoviesName: { $push: "$name" },
      //     // ratings: { $push: "$rating" },
      //     // min: { $min: "$rating" },
      //     // avg: { $avg: "$rating" },
      //     // max: { $max: "$rating" },
      //   },
      // },
      // { $sort: { count: -1 } },
      // { $match: { count: { $gte: 4 } } },
      {
        $project: {
          totalCount: { $arrayElemAt: ["$Total.count", 0] },
          above7Count: { $arrayElemAt: ["$above7.count", 0] },
          percentageAbove7: {
            $multiply: [
              {
                $divide: [
                  { $arrayElemAt: ["$above7.count", 0] },
                  { $arrayElemAt: ["$Total.count", 0] },
                ],
              },
              100,
            ],
          },
        },
      },
      // { $match: { genresLen: { $gte: 3 } } },
    ]);
    res.status(200).json({
      status: "success",
      count: movies.length,
      data: { movies },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

//? Delete Movie function
exports.deleteMovie = asyncErorrhandler(async (req, res, next) => {
  const id = req.params.id;
  const deletedMovie = await Movie.findOneAndDelete({ _id: id });
  if (!deletedMovie) {
    return next(
      new CustomError("The Movie you are Looking for is not existed", 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: deletedMovie,
  });
});
