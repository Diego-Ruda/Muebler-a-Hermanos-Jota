import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import connectDB from '../config/db.js';
import productos from '../data/productos.js';
import Product from '../models/Product.js';

dotenv.config({
  path: path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    '.env'
  ),
});

const STOCK_INICIAL = 10;

async function seedProductos() {
  const productosSeed = productos.map((producto) => {
    const datos = {
      ...producto,
      imagenUrl: producto.imagen,
      stock: STOCK_INICIAL,
    };

    delete datos.id;
    delete datos.imagen;

    return datos;
  });

  const operaciones = productosSeed.map((producto) => ({
    updateOne: {
      filter: { nombre: producto.nombre },
      update: { $set: producto },
      upsert: true,
    },
  }));

  const resultado = await Product.bulkWrite(operaciones);

  console.log(
    `Seed completado: ${resultado.upsertedCount} insertados, ` +
      `${resultado.modifiedCount} actualizados, ` +
      `${resultado.matchedCount} encontrados.`
  );
}

try {
  await connectDB();
  await seedProductos();
} catch (error) {
  console.error('Error al ejecutar el seed:', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
