import assert from 'node:assert/strict';
import test from 'node:test';
import Contact from './Contact.js';

async function validationError(contact) {
  try {
    await contact.validate();
    return null;
  } catch (error) {
    return error;
  }
}

test('requires nombre, email and mensaje', async () => {
  const error = await validationError(new Contact({}));

  assert.ok(error);
  assert.deepEqual(Object.keys(error.errors).sort(), [
    'email',
    'mensaje',
    'nombre',
  ]);
});

test('rejects invalid email and overly long fields', async () => {
  const emailError = await validationError(
    new Contact({
      nombre: 'Cliente',
      email: 'correo-invalido',
      mensaje: 'Hola',
    })
  );

  assert.ok(emailError.errors.email);

  const mensajeError = await validationError(
    new Contact({
      nombre: 'Cliente',
      email: 'cliente@example.com',
      mensaje: 'a'.repeat(2001),
    })
  );

  assert.ok(mensajeError.errors.mensaje);
});

test('normalizes email and trims text fields', async () => {
  const contact = new Contact({
    nombre: '  Cliente  ',
    email: '  CLIENTE@Example.com  ',
    mensaje: '  Hola  ',
  });

  await contact.validate();

  assert.equal(contact.nombre, 'Cliente');
  assert.equal(contact.email, 'cliente@example.com');
  assert.equal(contact.mensaje, 'Hola');
});
