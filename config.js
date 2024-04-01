const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

dotenv.config();
const MONGODB_CONNECTION_URL = process.env.DB_URL || '';

const mongoDbConnection = () => {
  mongoose.connect(MONGODB_CONNECTION_URL);
  mongoose.connection.on('connected', () => {
    console.log('Database connected successfully');
  });
  mongoose.connection.on('error', (err) => {
    console.log(`An error has occurred: ${err.message}`);
  });
};

module.exports = mongoDbConnection;
