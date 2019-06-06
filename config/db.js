const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

/**
 * connectDB function to connect to mongoDB using the db config params
 * Wrap async / await within try/catch for error catching. 
 */
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Error:", err.message);
    //Exit process with failure
    process.exit(1);
  }
}

module.exports = connectDB;