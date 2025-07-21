// Generic Zod validation middleware 
const validate = (schema, property = 'body') => (req, res, next) => {
  try {
    req[property] = schema.parse(req[property]);
    next();
  } catch (err) {
    console.error('Validation error:', err);
    return res.status(400).json({ error: 'Validation error', details: err.errors });
  }
};

module.exports = { validate };
