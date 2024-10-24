require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require("./routes/user");

const app = express();

// CORS configuration based on environment
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://workoutpal-frontend-axz7.onrender.com'  // Production frontend URL
    : 'http://localhost:5173',                          // Development frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use the CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON and log request details
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
