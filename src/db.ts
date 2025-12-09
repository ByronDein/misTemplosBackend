import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from 'mysql2'; // Import mysql2 explicitly

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'tvkiosk_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    dialectModule: mysql2, // Force Sequelize to use the imported mysql2 module
    logging: console.log, // Enable logging to see errors in Vercel logs
    dialectOptions: {
        // ssl: {
        //     require: false,
        //     rejectUnauthorized: false
        // },
        connectTimeout: 60000 // Increase timeout to 60s
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  }
);

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
