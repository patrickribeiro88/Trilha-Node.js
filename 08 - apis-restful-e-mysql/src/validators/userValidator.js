const Joi = require('joi');

const createSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(0).optional()
});

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  age: Joi.number().integer().min(0).optional()
}).min(1);

function validateCreate(req, res, next) {
  const { error } = createSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message, details: error.details });
  next();
}

function validateUpdate(req, res, next) {
  const { error } = updateSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message, details: error.details });
  next();
}

module.exports = { validateCreate, validateUpdate };
