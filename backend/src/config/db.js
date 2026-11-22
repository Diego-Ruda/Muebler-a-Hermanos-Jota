import mongoose from 'mongoose';
import migrateUserRoles from './migrateUserRoles.js';

let connectionPromise = null;

mongoose.connection.on('disconnected', () => {
  connectionPromise = null;
});

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI no está definida en las variables de entorno');
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(uri)
      .then(async (conn) => {
        console.log(`MongoDB conectado: ${conn.connection.host}`);
        await migrateUserRoles();
        return conn;
      })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
};

export default connectDB;
