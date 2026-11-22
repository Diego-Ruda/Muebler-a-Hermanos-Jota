import { ROLES, VALID_ROLES } from '../constants/roles.js';
import User from '../models/User.js';

export default async function migrateUserRoles() {
  const result = await User.collection.updateMany(
    {
      $or: [
        { role: { $exists: false } },
        { role: { $nin: VALID_ROLES } },
        { rol: { $exists: true } },
      ],
    },
    [
      {
        $set: {
          role: {
            $cond: [
              { $in: ['$role', VALID_ROLES] },
              '$role',
              {
                $switch: {
                  branches: [
                    { case: { $eq: ['$rol', 'admin'] }, then: ROLES.ADMIN },
                    { case: { $eq: ['$rol', 'cliente'] }, then: ROLES.USER },
                  ],
                  default: ROLES.USER,
                },
              },
            ],
          },
          rol: '$$REMOVE',
        },
      },
    ]
  );

  if (result.modifiedCount > 0) {
    console.log(`Roles de usuarios normalizados: ${result.modifiedCount}`);
  }
}
