import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import logger from './middlewares/loggerMiddleware.js';
import productosRoutes from './routes/productosRoutes.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;
const PUBLIC_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public'
);

connectDB();

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.static(PUBLIC_DIR));
app.use('/api/productos', productosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
