const jwt = require("jsonwebtoken");

const { errorResponse } = require("../../utils/response.utils");
/**
 * Create an authentication middleware with a given secret and options.
 * @param {Object} options
 * @param {string} options.secret - JWT secret key
 * @param {function} [options.onError] - Optional error handler
 * @returns {function} Express middleware
 */
function createAuthMiddleware({ secret, onError } = {}) {
  return function authMiddleware(req, res, next) {
    try {
      console.log("Auth middleware triggered for:", req.method, req.originalUrl);
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return errorResponse(
          res,
          "Error in authentication key. Invalid Request",
          { message: "AUTH_TOKEN_NOT_FOUND" },
          403
        );
      }
      const token = authHeader.split(" ")[1];
      
      const decoded = jwt.verify(token, secret);
      if (!decoded || !decoded.id) {
        return errorResponse(
          res,
          "Invalid authentication token",
          { message: "INVALID_AUTH_TOKEN" },
          403
        );
      }

      req.user = req.user || {}; // it was added to ensure req.user exists
      req.user.id = decoded.id || decoded._id; 
      next();
    } catch (error) {
      if (onError) return onError(error, req, res, next);
      return errorResponse(
        res,
        "Authentication token not found or invalid",
        { message: "AUTH_TOKEN_NOT_FOUND" },
        403
      ); 
    }
  };
}

module.exports = {
  createAuthMiddleware,
};
