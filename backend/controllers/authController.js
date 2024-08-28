import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const register = async (req, res) => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
   
        // Create a new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            photo: req.body.photo
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        res.status(201).json({ success: true, message: 'User registered successfully', data: savedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to register user. Try again.', error: err.message });
    }
};

// Login user
export const login = async (req, res) => {
    const email = req.body.email
    console.log(req.body)
    try {
        // Check if the user exists
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15d' });
        console.log(token)

        res.cookie('accessToken',token,{ httpOnly: true,
             expires:token.expiresIn

         }).status(200).json({ success: true, message: 'Logged in successfully', token, user });

        // res.status(200).json({ success: true, message: 'Logged in successfully', token, user });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to login. Try again.', error: err.message });
    }
};
