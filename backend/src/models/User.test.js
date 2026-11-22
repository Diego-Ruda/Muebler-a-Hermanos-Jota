import assert from 'node:assert/strict';
import test from 'node:test';
import { ROLES, VALID_ROLES } from '../constants/roles.js';
import User from './User.js';

test('defaults new user documents to USER', () => {
  const user = new User({
    nombre: 'Cliente',
    email: 'cliente@example.com',
    password: 'hashed-password',
  });

  assert.equal(user.role, ROLES.USER);
});

test('restricts user roles to the supported values', () => {
  const rolePath = User.schema.path('role');

  assert.deepEqual(rolePath.enumValues, VALID_ROLES);
});
