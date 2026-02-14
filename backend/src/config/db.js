const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const connectDB = async (retries = 10) => {
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('Database connected successfully');
      return;
    } catch (error) {
      console.log(
        `Database not ready. Retrying... (${retries} attempts left)`
      );
      retries--;
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  console.error('Database connection failed after retries');
  process.exit(1);
};

module.exports = { sequelize, connectDB };
