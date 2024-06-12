const { z } = require('zod');

const errorHandler = (err, req, res, next) => {
  if (err instanceof z.ZodError) {
    return res.status(400).json({ 
        err: err.errors[0].message
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
        errors: Object.values(err.errors).map(e => e.message) 
    });
  }

  res.status(500).json({ message: 'An internal server error occurred' });
};

module.exports = errorHandler;
