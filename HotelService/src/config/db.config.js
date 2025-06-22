const dotenv = require('dotenv');

dotenv.config();

const config = {
  development: {
    username: "root",
    password:"542542",
    database: "airbnb_hotel_dev",
    host: "localhost",
    dialect: 'mysql',
  }
}

module.exports = config;