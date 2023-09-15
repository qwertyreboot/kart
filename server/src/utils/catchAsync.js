const catchAsync = (fn) => {
  return (req, res, next) =>
    Promise.resolve(fn.call(this, req, res, next)).catch(next);
};

module.exports = catchAsync;
