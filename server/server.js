import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import cors from "cors"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // frontend port
    credentials: true
}));


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
