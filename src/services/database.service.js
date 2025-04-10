import { client } from '../config/database.js';
import CustomError from '../utils/custom.error.js';

class DatabaseService {
  async createStaff({ first_name, last_name, username, password }) {
    const { rows } = await client.query(
      `insert into staffs (first_name, last_name, username, password)
       values ($1, $2, $3, $4) returning *`,
      [first_name, last_name, username, password]
    );

    console.log('createStaff: ', rows[0]);

    return rows[0];
  }

  async createStudent(data) {}

  async findOneStaff(username) {
    try {
      const { rows } = await client.query(
        `select * from staffs where username = $1`,
        [username]
      );

      return rows[0];
    } catch (err) {
      throw new CustomError(err.message, 500);
    }
  }

  async findOneStudent(username) {
    try {
      const { rows } = await client.query(
        `select * from students where username = $1`,
        [username]
      );

      return rows[0];
    } catch (err) {
      throw new CustomError(err.message, 500);
    }
  }

  async findStaffRole(staff_id) {
    console.log('staff id: ', staff_id); // staff id is coming
    const { rows } = await client.query(
      `select roles.name from staffs inner join staff_roles sr on sr.staff_id = staffs.id
      inner join roles on roles.id = sr.role_id where sr.staff_id = $1`,
      [staff_id]
    );

    console.log('role name: ', rows[0]);

    return rows[0];
  }
}

export default DatabaseService;
