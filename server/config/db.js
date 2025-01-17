require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async (dbName) => {
  try {
    const uri = process.env.MONGODB_URI.replace('/?', `/${dbName}?`);
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
