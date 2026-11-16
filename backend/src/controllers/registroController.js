import bcrypt from 'bcrypt';
import User from '../models/User.js';

const SALT_ROUNDS = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarDatos({ nombre, email, password }) {
  const errores = [];

  if (typeof nombre !== 'string' || !nombre.trim()) {
    errores.push('El nombre es obligatorio');
  }

  if (typeof email !== 'string' || !email.trim()) {
    errores.push('El correo electrónico es obligatorio');
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errores.push('El correo electrónico no es válido');
  }

  if (typeof password !== 'string' || !password) {
    errores.push('La contraseña es obligatoria');
  } else if (password.length < 8) {
    errores.push('La contraseña debe tener al menos 8 caracteres');
  }

  return errores;
}

export async function registrarUsuario(req, res) {
  const { nombre, email, password } = req.body ?? {};
  const errores = validarDatos({ nombre, email, password });

  if (errores.length > 0) {
    return res.status(400).json({
      mensaje: 'Datos de registro inválidos',
      errores,
    });
  }

  const emailNormalizado = email.trim().toLowerCase();

  try {
    const usuarioExistente = await User.findOne({ email: emailNormalizado });

    if (usuarioExistente) {
      return res
        .status(409)
        .json({ mensaje: 'El correo electrónico ya está registrado' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const usuario = await User.create({
      nombre: nombre.trim(),
      email: emailNormalizado,
      password: passwordHash,
    });

    return res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ mensaje: 'El correo electrónico ya está registrado' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        mensaje: 'Datos de registro inválidos',
        errores: Object.values(error.errors).map((e) => e.message),
      });
    }

    console.error('Error al registrar el usuario:', error.message);
    return res.status(500).json({ mensaje: 'Error al registrar el usuario' });
  }
}
