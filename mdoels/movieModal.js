const mongoose = require("mongoose");
const fs = require("fs");
const validatorJs = require("validator");

// creating schema
const schema = new mongoose.Schema(
  {
    name: {
      validate: [validatorJs.isAlpha, "This is not Alpha Name"],
      type: String,
      required: [true, "name is required field"], //Built-in validators
      unique: true, // ! this is not Built-in validators
      trim: true,
      maxLength: [100, "The name must not have more than 100 characters"], // this is called Built-in validators
      minLength: [2, "The name must have at least 2 characters "], //Built-in validators
    },
    description: {
      type: String,
      required: [true, "description is required field"],
      unique: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "name is required field"],
    },
    rating: {
      type: Number,
      // min: [4, "There is no F** Movie like this rating in our db"],
      validate: {
        validator: function (value) {
          return value >= 4 && value <= 10;
        },
        message: "The rating {VALUE} should be between 4 and 10 ",
      },

      // max: [10, "man the max rating is 10 where are you going"],
      // default: 1.0, // if you don't add it will be added automatically
    },
    totalRating: {
      type: Number,
    },
    releaseYear: {
      type: Number,
      required: [true, "release Year is required field"],
    },
    releaseDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    genres: {
      type: [String],
      required: [true, "genres Year is required field"],
      enum: {
        values: [
          "Drama",
          "Romance",
          "Action",
          "Adventure",
          "Fantasy",
          "Crime",
          "Thriller",
          "Horror",
          "Sci-Fi",
          "Biography",
          "War",
          "Music",
          "Mystery",
          "Comedy",
        ],
        message: "This genres is not allowed",
      },
    },
    directors: {
      type: [String],
      required: [true, "directors is required field"],
    },
    coverImage: {
      type: String,
      required: [true, "cover Image  is required field"],
    },
    actors: {
      type: [String],
      required: [true, "actors is required field"],
    },
    price: {
      type: Number,
      required: [true, "price is required field"],
      // select: false, // so you i don't want to view it in the response
    },
    createdBy: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }, // have it in object form
  }
);

schema.virtual("durationInHours").get(function () {
  return this.duration / 60;
});

schema.pre("save", function (next) {
  this.createdBy = "Ahmad";
  next();
});

// Query MiddleWares
schema.pre(/^find/, function (next) {
  // ady query method starts with find
  this.find({ releaseDate: { $lte: Date.now() } });
  this.startTime = Date.now();
  next();
});

schema.pre("aggregate", function (next) {
  // console.log(Date.now());
  this.pipeline().unshift({
    $match: { releaseYear: { $lte: new Date().getFullYear() } },
  });
  // this.find({ releaseDate: { $lte: new Date().getFullYear() } });
  next();
});

schema.post(/^find/, function (doc, next) {
  this.endTime = Date.now();
  const content = `The Data Took ${this.endTime - this.startTime}`;
  fs.writeFileSync(
    "./NewDocumenstsByPost/logs.txt",
    content,
    {
      flag: "a",
    },
    (err) => {
      console.log(err);
    }
  );
  next();
});

schema.post("save", function (doc, next) {
  const content = `new Movie with the name ${doc.name} has been added\n`;
  fs.writeFileSync(
    "./NewDocumenstsByPost/logs.txt",
    content,
    {
      flag: "a",
    },
    (err) => {
      console.log(err);
    }
  );
  next();
});

// Creating the Movies Collection  ('s will be added automatically)
const Movie = mongoose.model("movie", schema);

module.exports = Movie;
