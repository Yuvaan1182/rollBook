const { errorResponse } = require("../../utils/response.utils");

const validate =
  (schema, property = "body") =>
  (req, res, next) => {
    try {
      req[property] = schema.parse(req[property]);
      next();
    } catch (err) {
      console.error("Input Validation error:", err);

      return errorResponse(res, "Validation error", err, 400);
    }
  };

module.exports = { validate };
