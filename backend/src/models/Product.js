import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
      default: '',
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    stock: {
      type: Number,
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },
    imagenUrl: {
      type: String,
      trim: true,
      default: '',
    },
    medidas: {
      type: String,
      trim: true,
      default: '',
    },
    detallesFabricacion: {
      type: String,
      trim: true,
      default: '',
    },
    destacado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
