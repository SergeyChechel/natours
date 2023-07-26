module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
    // вх параметр next это тоже самое что и (err) => next(err)
  };
};
