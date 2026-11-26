import mongoose from 'mongoose';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      maxlength: [120, 'El nombre no puede superar los 120 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      lowercase: true,
      trim: true,
      match: [EMAIL_REGEX, 'El correo electrónico no es válido'],
    },
    mensaje: {
      type: String,
      required: [true, 'El mensaje es obligatorio'],
      trim: true,
      maxlength: [2000, 'El mensaje no puede superar los 2000 caracteres'],
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
