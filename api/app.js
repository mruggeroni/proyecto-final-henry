import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import PackageRoutes from './routes/PackagesRoutes.js';
import CategoriesRoutes from './routes/CategoriesRoutes.js';
import ActivitiesRoutes from './routes/ActivitiesRoutes.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(PackageRoutes);
app.use(CategoriesRoutes)
app.use(ActivitiesRoutes);

export default app;