import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { connectDB, sequelize } from './db';
import './models/Device'; // Import models to register them

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Initialize DB and start server
const startServer = async () => {
  await connectDB();
  // Sync models with database (create tables if not exist)
  await sequelize.sync({ alter: true }); 
  console.log('Database synced');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
