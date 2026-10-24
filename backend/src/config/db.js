import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error(
        'MONGODB_URI no está definida en las variables de entorno'
      );
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('Error al conectar a MongoDB:');
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
