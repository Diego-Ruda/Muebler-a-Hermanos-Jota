import Contact from '../models/Contact.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NOMBRE_LENGTH = 120;
const MAX_MENSAJE_LENGTH = 2000;

function validarDatos({ nombre, email, mensaje }) {
  const errores = [];

  if (typeof nombre !== 'string' || !nombre.trim()) {
    errores.push('El nombre es obligatorio');
  } else if (nombre.trim().length > MAX_NOMBRE_LENGTH) {
    errores.push(
      `El nombre no puede superar los ${MAX_NOMBRE_LENGTH} caracteres`
    );
  }

  if (typeof email !== 'string' || !email.trim()) {
    errores.push('El correo electrónico es obligatorio');
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errores.push('El correo electrónico no es válido');
  }

  if (typeof mensaje !== 'string' || !mensaje.trim()) {
    errores.push('El mensaje es obligatorio');
  } else if (mensaje.trim().length > MAX_MENSAJE_LENGTH) {
    errores.push(
      `El mensaje no puede superar los ${MAX_MENSAJE_LENGTH} caracteres`
    );
  }

  return errores;
}

export async function crearMensajeContacto(req, res) {
  const { nombre, email, mensaje } = req.body ?? {};
  const errores = validarDatos({ nombre, email, mensaje });

  if (errores.length > 0) {
    return res.status(400).json({
      mensaje: 'Datos de contacto inválidos',
      errores,
    });
  }

  try {
    await Contact.create({
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      mensaje: mensaje.trim(),
    });

    return res.status(201).json({ mensaje: 'Mensaje enviado correctamente' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        mensaje: 'Datos de contacto inválidos',
        errores: Object.values(error.errors).map((e) => e.message),
      });
    }

    console.error('Error al guardar el mensaje de contacto:', error.message);
    return res
      .status(500)
      .json({ mensaje: 'Error al enviar el mensaje de contacto' });
  }
}
