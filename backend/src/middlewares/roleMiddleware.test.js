import assert from 'node:assert/strict';
import test from 'node:test';
import { ROLES } from '../constants/roles.js';
import { authorizeRoles } from './roleMiddleware.js';

function createResponse() {
  return {
    statusCode: null,
    body: null,
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

test('requires authentication before checking the role', () => {
  const response = createResponse();
  let nextCalled = false;

  authorizeRoles(ROLES.ADMIN)({}, response, () => {
    nextCalled = true;
  });

  assert.equal(response.statusCode, 401);
  assert.equal(nextCalled, false);
});

test('rejects USER access to an ADMIN-only route', () => {
  const response = createResponse();
  let nextCalled = false;

  authorizeRoles(ROLES.ADMIN)({ user: { role: ROLES.USER } }, response, () => {
    nextCalled = true;
  });

  assert.equal(response.statusCode, 403);
  assert.equal(
    response.body.mensaje,
    'No tienes permisos para realizar esta acción'
  );
  assert.equal(nextCalled, false);
});

test('allows an ADMIN to continue', () => {
  const response = createResponse();
  let nextCalled = false;

  authorizeRoles(ROLES.ADMIN)({ user: { role: ROLES.ADMIN } }, response, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
});
