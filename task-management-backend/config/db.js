const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const dbURI = process.env.MONGO_URI; // Use environment variable for the DB URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const taskRoutes = require('../routes/task_routes'); // Adjusted the relative path
app.use('/api/tasks', taskRoutes); // Using `/api/tasks` for task-related routes

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Management API!');
});

// Start the server
const PORT = process.env.PORT || 5007; // Use PORT from environment variables if available
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
