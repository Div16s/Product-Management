const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ 
                err: 'User already exists' 
            });
        }

        const user = await User.create({ 
            email, 
            password 
        });
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ 
            message: "User signed up successfully.",
            userInfo: {
                email: user.email,
                token: token
            } 
        });
    }
    catch (error) {
        res.status(500).json({ 
            err: error.message 
        });
        console.log("Error in signup: ", error.message);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ 
                err: 'User does not exist, please sign up.' 
            });
        }

        const isPasswordMatches = await user.matchPassword(password);

        if (!isPasswordMatches) {
            return res.status(400).json({ 
                err: 'Incorrect password.' 
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ 
            message: "Login successful.",
            userInfo: {
                email: user.email,
                token: token
            } 
        });
    }
    catch (error) {
        res.status(500).json({ 
            err: error.message 
        });
        console.log("Error in login: ", error.message);
    }
}

module.exports = { signup, login };