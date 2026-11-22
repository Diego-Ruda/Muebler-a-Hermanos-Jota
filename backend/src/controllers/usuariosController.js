export function obtenerPerfil(req, res) {
  const usuario = req.user ?? req.usuario;

  if (!usuario) {
    return res.status(401).json({ mensaje: 'Autenticación requerida' });
  }

  return res.status(200).json({
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      role: usuario.role,
    },
  });
}
