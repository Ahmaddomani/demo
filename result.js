const fs = require("fs");

const movies = JSON.parse(fs.readFileSync("./Data/movies.json", "utf-8"));

// console.log(movies);

const moviesWithPrice = movies.map((movie) => {
  let price;
  if (movie.rating >= 9.0) {
    price = 11.99;
  } else if (movie.rating >= 7.5) {
    price = 9.99;
  } else if (movie.rating >= 6.0) {
    price = 8.99;
  } else if (movie.rating >= 5.0) {
    price = 7.99;
  } else {
    price = 5.99;
  }

  return {
    ...movie,
    price: price.toFixed(2), // لجعل السعر بصيقة عشرية (مثلاً 9.99)
  };
});

console.log(moviesWithPrice);
