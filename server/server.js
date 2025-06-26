import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';
import createIssue from './routes/issue.route.js';
dotenv.config({});
connectDB();

const app=express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1', createIssue);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));