import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import feedbackRoutrs from './routes/feedback.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

//connect to db
connectDB();

app.use(cors());
app.use(express.json());

//route middleware
app.use('/api/feedback', feedbackRoutrs); //wire ffedback routes

app.get('/',(req,res)=>{
    res.send('Feedpulse API running');
});

app.listen(PORT,()=>{
    console.log('Server running on http://localhost:${PORT}');
});