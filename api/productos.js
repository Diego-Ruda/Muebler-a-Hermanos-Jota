import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import connectDB from '../backend/src/config/db.js';
import {
  getProductos,
  getProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
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
  try {
    await connectDB();
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    return res
      .status(500)
      .json({ mensaje: 'Error de conexión a la base de datos' });
  }

  const { id } = req.query ?? {};
  const method = req.method;

  if (method === 'GET') {
    if (id) {
      return getProductoPorId({ params: { id } }, res);
    }
    return getProductos(req, res);
  }

  if (method === 'POST') {
    return crearProducto(req, res);
  }

  if (method === 'PUT' || method === 'PATCH') {
    if (!id) {
      return res.status(400).json({ mensaje: 'ID de producto requerido' });
    }
    return actualizarProducto({ params: { id }, body: req.body }, res);
  }

  if (method === 'DELETE') {
    if (!id) {
      return res.status(400).json({ mensaje: 'ID de producto requerido' });
    }
    return eliminarProducto({ params: { id } }, res);
  }

  res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE');
  return res.status(405).json({ mensaje: 'Método no permitido' });
}
