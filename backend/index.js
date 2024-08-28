import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Importing routes
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/booking.js';

dotenv.config(); // Loading environment variables

const app = express();
const port = process.env.PORT || 5000; // Port defined in .env or default to 8000

// CORS Options
const corsOptions = {
    origin: true, // Accept requests from any origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Simple route for testing
app.get('/', (req, res) => {
    res.send('API is working');
});

// Database connection setup
mongoose.set('strictQuery', false); // Disable strict query for mongoose

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB database connected');
    } catch (err) {
        console.log('MongoDB database connection failed:', err.message);
    }
};

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cors(corsOptions)); // Enable CORS with the defined options
app.use(cookieParser()); // Parse cookies

// Define your routes
app.use('/api/tours', tourRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/review', reviewRoute);
app.use('/api/booking', bookingRoute);

// Start the server and connect to the database
app.listen(port, () => {
    connect(); // Establish database connection when server starts
    console.log(`Server listening on port ${port}`);
});





