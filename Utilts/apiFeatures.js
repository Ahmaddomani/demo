const qs = require("qs");

class apiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //This is the Normal way mongoose 6.0 or less

    // create list of fields That i don't want to filter them
    const excludingFields = ["sort", "page", "limit", "fields"];

    // create Shallow copy from req.body
    const shallowCopy = { ...this.queryString };

    // Delete the Sort and page and others for good filter
    excludingFields.forEach((el) => delete shallowCopy[el]);

    // if there is a query to filter by them
    if (Object.keys(shallowCopy).length) {
      const parsedQuery = qs.parse(shallowCopy); // بدل req.query

      // Convert the object into string
      let stringsQuery = JSON.stringify(parsedQuery);

      const afterReplace = stringsQuery.replace(
        /\b(gt|gte|lt|lte)/g,
        (match) => `$${match}`
      );

      ///These are the same queries but after replace the [gt] with [$gt]
      const result = JSON.parse(afterReplace);

      this.query = this.query.find(result);
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const afterDelete = this.query.sort.replaceAll("/", " ");
      this.query = this.query.sort(afterDelete);
    }
    // This is else in case of there is no sort so i want to sort by releaseDate
    else {
      // Get the newest ones
      this.query = this.query.sort("-releaseDate");
    }
    return this;
  }

  fields() {
    // Get Filed so we can get the only filed we want
    if (this.queryString.fields) {
      // query.select("name price duration"); // just take fetch data with these properties called (projections)
      const fields = this.queryString.fields.split(",").join(" ");
      this.query.select(fields);
    } else {
      this.query.select("-__v"); // (-) means get all without this (__v)
    }
    return this;
  }
  paginate() {
    //  Pagination (page and limit)
    const page = this.queryString.page || 1;

    const limit = this.queryString.limit || 10;

    const skip = (page - 1) * limit;

    this.query.skip(skip).limit(limit);

    // if (this.queryString.page) {
    //   const MoviesCount = await Movie.countDocuments();
    //   if (skip >= MoviesCount) {
    //     throw new Error("Page is not Found");
    //   }
    // }
    return this;
  }
}

module.exports = apiFeatures;
