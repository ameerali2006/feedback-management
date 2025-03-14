import express from 'express';
import dotenv from 'dotenv';
import connectMongo from './config/mongo';
import authRoutes from './routes/authRoutes';
import feedbackRoutes from './routes/feedbackRouter';
import analyticsRoutes from './routes/analyticsRoutes';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));
app.use(express.json());

connectMongo();

app.use('/api', authRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', analyticsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));