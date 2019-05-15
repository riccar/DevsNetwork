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

/**
 * Init Middleware
 */

//Allows to get json data in request.body
app.use(express.json({
  extended: false
}));

app.get('/', (req, res) => res.send('Server API Running'));

/**
 * Define Routes - Map each route to the proper file in routes/api
 */

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

/**
 * Define PORT based on deployed environment or 5000 by default
 */
const PORT = process.env.PORT || 5000;

/**
 * Start express server 
 */

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));