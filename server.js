const express = require('express');
const connectDB = require('./config/db');

/**
 * Declare express server app
 */
const app = express();

/**
 * Connect to MongoDB Database
 */
connectDB();

app.get('/', (req, res) => res.send('Server API Running'));

/**
 * Define PORT based on deployed environment or 5000 by default
 */
const PORT = process.env.PORT || 5000;

/**
 * Start express server 
 */

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));