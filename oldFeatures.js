// ?------------------------ Red color means code others are comments---------------
// ?------------------------ Red color means code others are comments---------------
//This is the Normal way mongoose 6.0 or less

// create list of fields That i don't want to filter them

// ? ----------------------------------Filtering-------------------------

//  ! const excludingFields = ["sort", "page", "limit", "fields"];

// create Shallow copy from req.body
//! const shallowCopy = { ...req.query };

// Delete the Sort and page and others for good filter
// ! excludingFields.forEach((el) => delete shallowCopy[el]);

// ! i use this so i can sort it by mongoose sort method ↓ (let query = Movie.find();)

// Query here doesn't mean the query from url its just like object or data from dataBase
//! let query = Movie.find();

// if there is a query to filter by them
//! if (Object.keys(shallowCopy).length) {
// to get them as the teacher code with ex :  {gt:50} as value
//! const parsedQuery = qs.parse(shallowCopy); // بدل req.query

// Convert the object into string
// ! let stringsQuery = JSON.stringify(parsedQuery);

// !const afterReplace = stringsQuery.replace(
// !  /\b(gt|gte|lt|lte)/g,
// !  (match) => `$${match}`
// !);

///These are the same queries but after replace the [gt] with [$gt]
//! const result = JSON.parse(afterReplace);

// !query.find(result);
// }

// ?  let allMovies = await Movie.find(result); // this will not work if i want to sort

//localhost:3000/api/movies/?sort=-price/duration&price=7.99 we use this to sort by price or if the prices are equals sortBy duration

// check if the query have sort to sort by it

// ?  ------------------------------Sorting---------------------------------------------------

// !if (req.query.sort) {
//  !  const afterDelete = req.query.sort.replaceAll("/", " ");
//  ! query = query.sort(afterDelete);
//! }
// // This is else in case of there is no sort so i want to sort by releaseDate
//! else {
//   // Get the newest ones
// !  query = query.sort("-releaseDate");
// !}

// ?---------------------------Fields---------------------

// Get Filed so we can get the only filed we want
// ! if (req.query.fields) {
//   // query.select("name price duration"); // just take fetch data with these properties called (projections)
//  ! const fields = req.query.fields.split(",").join(" ");
//   !query.select(fields);
// !} else {
// !  query.select("-__v"); // (-) means get all without this (__v)
// !}

//---------------------------------- Pagination (page and limit)--------------------------

// !const page = req.query.page || 1;

//! const limit = req.query.limit || 10;

// !const skip = (page - 1) * limit;

// !query.skip(skip).limit(limit);

//! if (req.query.page) {
// !  const MoviesCount = await Movie.countDocuments();
// !  if (skip >= MoviesCount) {
//  !   throw new Error("Page is not Found");
//  ! }
// !}

// This is another good way

// const allMovies = await Movie.find().where("duration").gt(150);
// if (allMovies.length) {
//   res.status(200).json({
//     length: allMovies.length,
//     status: "succsess",
//     data: allMovies,
//   });
// } else {
//   throw Error("An Error Happend");
// }
