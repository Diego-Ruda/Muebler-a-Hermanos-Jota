import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarCredenciales({ email, password }) {
  const errores = [];

  if (typeof email !== 'string' || !email.trim()) {
    errores.push('El correo electrónico es obligatorio');
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errores.push('El correo electrónico no es válido');
  }

  if (typeof password !== 'string' || !password) {
    errores.push('La contraseña es obligatoria');
  }

  return errores;
}

export async function iniciarSesion(req, res) {
  const { email, password } = req.body ?? {};
  const errores = validarCredenciales({ email, password });

  if (errores.length > 0) {
    return res.status(400).json({
      mensaje: 'Datos de inicio de sesión inválidos',
      errores,
    });
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error('JWT_SECRET no está definida en las variables de entorno');
    return res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }

  const emailNormalizado = email.trim().toLowerCase();

  try {
    const usuario = await User.findOne({ email: emailNormalizado }).select(
      '+password'
    );

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      {
        id: usuario._id.toString(),
        email: usuario.email,
        rol: usuario.rol,
      },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN ?? '2h' }
    );

    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    return res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
}
