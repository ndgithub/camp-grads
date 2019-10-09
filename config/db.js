const mongoose = require('mongoose');
const config = require('config');
const dbUri = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, { useNewUrlParser: true });
    console.log('MongoDB Connected...')
  } catch (err) {
    console.log(err.message);
    // Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB;