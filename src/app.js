import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import auth2Routes from './routes/auth2.routes.js';
import cookieParser from 'cookie-parser';
import taskRoutes from './routes/task.routes.js';
import cors from 'cors';

import boletasRoutes from './routes/boletas.routes.js';

import productRoutes from './routes/products.routes.js';

const app = express();

app.use(cors({
  origin: 'https://frontend-o78n.onrender.com',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());



app.use('/api',authRoutes);
app.use('/api',taskRoutes);
app.use('/api',auth2Routes);
app.use('/api',boletasRoutes);



app.use("/api", productRoutes);




export default app;