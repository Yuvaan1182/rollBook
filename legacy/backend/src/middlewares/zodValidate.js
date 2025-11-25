// Generic Zod validation middleware for Express
const validate = (schema, property = 'body') => (req, res, next) => {
  try {
    req[property] = schema.parse(req[property]);
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Validation error', details: err.errors });
  }
};

module.exports = validate;
