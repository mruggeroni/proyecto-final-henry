import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import PackageRoutes from './routes/PackagesRoutes.js';
import CategoriesRoutes from './routes/CategoriesRoutes.js';
import ActivitiesRoutes from './routes/ActivitiesRoutes.js';
import DestinationsRoutes from './routes/DestinationsRoutes.js'
import UsersRoutes from './routes/UsersRoutes.js';
import OrderRoutes from './routes/OrdersRouter.js';
import FavouritesRoutes from './routes/FavouritesRoutes.js';
import RatingRoutes from './routes/RatingRoutes.js'
import PaymentRoutes from './routes/PaymentRoutes.js'

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(PackageRoutes);
app.use(CategoriesRoutes);
app.use(ActivitiesRoutes);
app.use(DestinationsRoutes);
app.use(UsersRoutes);
app.use(OrderRoutes);
app.use(FavouritesRoutes)
app.use(RatingRoutes)
app.use(PaymentRoutes)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

export default app;