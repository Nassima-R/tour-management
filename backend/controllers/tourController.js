import Tour from '../models/Tour.js';

// Create a new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();
        res.status(200).json({ success: true, message: 'Successfully created', data: savedTour });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create. Try again.' });
    }
};

// Update a tour
export const updateTour = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: 'Successfully updated', data: updatedTour });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update. Try again.' });
    }
};

// Delete a tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;

    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Successfully deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete. Try again.' });
    }
};

// Get a single tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;

    try {
        const tour = await Tour.findById(id).populate('reviews');
        if (!tour) {
            return res.status(404).json({ success: false, message: 'Tour not found' });
        }
        res.status(200).json({ success: true, data: tour });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch tour. Try again.' });
    }
};

// Get all tours
export const getAllTour = async (req, res) => {
    const page = parseInt(req.query.page) || 0; // Correction de l'erreur de frappe et ajout d'une valeur par défaut
    const limit = 8;

    try {
        const tours = await Tour.find({})
            .populate('reviews')
            .skip(page * limit)
            .limit(limit);
        res.status(200).json({ success: true, count: tours.length, data: tours });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Failed to fetch tours. Try again.' });
    }
};

// Get tour by search
export const getTourBySearch = async (req, res) => {
    const city = new RegExp(req.query.city, 'i');
    const distance = parseInt(req.query.distance) || 0;
    const maxGroupSize = parseInt(req.query.maxGroupSize) || 0;

    try {
        const tours = await Tour.find({
            city,
            distance: { $gte: distance },
            maxGroupSize: { $gte: maxGroupSize }
        }).populate('reviews');
        res.status(200).json({ success: true, data: tours });
    } catch (error) {
        res.status(404).json({ success: false, message: 'Failed to fetch tours. Try again.' });
    }
};

// Get featured tours
export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true }).populate('reviews').limit(8);
        res.status(200).json({ success: true, data: tours });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Failed to fetch tours. Try again.' });
    }
};

// Get tour counts
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({ success: true, data: tourCount });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch tour count. Try again.' });
    }
};
