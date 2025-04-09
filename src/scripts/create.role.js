import CustomError from '../utils/custom.error.js';

const createRole = async (client) => {
  const roles = [
    {
      name: 'teacher',
      description: 'teaches the students',
    },
    { name: 'admin', description: 'second best position' },
    {
      name: 'superadmin',
      description: 'the best position and head for everything',
    },
    { name: 'maneger', description: 'manager for creativity' },
    {
      name: 'teacher-assistant',
      description: 'assist to the main teacher',
    },
    {
      name: 'sales-manager',
      description: 'head for sales the product',
    },
  ];

  try {
    for (const role of roles) {
      const { rows } = await client.query(
        `select * from roles where name = $1`,
        [role.name]
      );

      if (rows.length === 0) {
        await client.query(
          `insert into roles (name, description) values ($1, $2)`,
          [role.name, role.description]
        );
      }
    }
  } catch (err) {
    throw new CustomError(err.message, 500);
  }
};

export default createRole;
