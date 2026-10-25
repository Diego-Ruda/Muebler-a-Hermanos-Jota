import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import connectDB from '../backend/src/config/db.js';
import {
  getProductos,
  getProductoPorId,
} from '../backend/src/controllers/productosController.js';

dotenv.config({
  path: path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    'backend',
    '.env'
  ),
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ mensaje: 'Método no permitido' });
  }

  try {
    await connectDB();
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    return res
      .status(500)
      .json({ mensaje: 'Error de conexión a la base de datos' });
  }

  const { id } = req.query ?? {};

  if (id) {
    return getProductoPorId({ params: { id } }, res);
  }

  return getProductos(req, res);
}
