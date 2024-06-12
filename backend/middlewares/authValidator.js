const { z } = require('zod');

const authValidator = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

const validateSignup = (req, res, next) => {
    try {
        authValidator.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = validateSignup;