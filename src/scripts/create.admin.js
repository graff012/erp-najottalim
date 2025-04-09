import bcrypt from 'bcryptjs';
import CustomError from '../utils/custom.error.js';

const createAdmin = async (client) => {
  try {
    const username = process.env.SUPER_ADMIN_USERNAME;
    const password = process.env.SUPER_ADMIN_PASSWORD;

    const { rows: staff } = await client.query(
      `select * from staffs where username = $1`,
      [username]
    );

    if (staff.length > 0) return;
    await client.query(`begin`);

    const hashedPassword = await bcrypt.hash(password, 12);

    const { rows: superadmin } = await client.query(
      `insert into staffs(username, password) values ($1, $2) returning *`,
      [username, hashedPassword]
    );

    const { rows: roleId } = await client.query(
      `select * from roles where name = $1`,
      ['superadmin']
    );

    await client.query(
      `insert into staff_roles(role_id, staff_id) values ($1, $2)`,
      [roleId[0].id, superadmin[0].id]
    );

    await client.query(`commit;`);
  } catch (err) {
    await client.query('rollback;');
    throw new CustomError(err.message, 500);
  }
};

export default createAdmin;
