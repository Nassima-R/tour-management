import User from '../models/User.js';

// Create a new user
export const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json({ success: true, message: 'User successfully created', data: savedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create user. Try again.', error: err.message });
    }
};

// Update a user
export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: 'User successfully updated', data: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update user. Try again.', error: err.message });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'User successfully deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete user. Try again.', error: err.message });
    }
};

// Get a single user
export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch user. Try again.', error: err.message });
    }
};

// Get all users
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch users. Try again.', error: err.message });
    }
};
