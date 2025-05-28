module.exports = (Routefunc) => {
  return (req, res, next) => {
    Routefunc(req, res, next).catch((err) => next(err));
  };
};
