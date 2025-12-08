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
// For Vercel, we export the app. For local dev, we listen.
if (process.env.VERCEL !== '1') {
  const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync({ alter: true });
        console.log('Database synced');
    } catch (e) {
        console.error('Error syncing database:', e);
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  };

  startServer();
} else {
    // In Vercel, we don't await the connection at top level to avoid timeouts on cold start
    // But we ensure it's connected before handling requests
    connectDB().catch(err => console.error("Vercel DB Connection Error:", err));
}

export default app;
