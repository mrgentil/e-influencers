import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/userRoutes.js';
import {connectDB, sequelize} from './config/db.js';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import campaignRoutes from "./routes/campaignRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import performanceRoutes from "./routes/performanceRoutes.js";


dotenv.config();

const app = express();

(async () => {
    await connectDB();
    await sequelize.sync();
})();


app.use(morgan('combined')); // Ajoute le logging des requêtes
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', // Remplacez par l'URL de votre frontend
    credentials: true,
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/users', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/performances', performanceRoutes);

// Middleware d'erreur
app.use(errorHandler);


app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
