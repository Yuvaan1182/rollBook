const successResponse = (res, message, data = null, status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data,
    error: null,
  });
};

const errorResponse = (res, message, err = {}, status = 500) => {
  const errorPayload = {
    message: err.message || message,
    type: err.name || "Error",
  };

  if (process.env.NODE_ENV !== "production" && err.stack) {
    errorPayload.stack = err.stack;
  }

  return res.status(status).json({
    success: false,
    message,
    data: null,
    error: errorPayload,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
