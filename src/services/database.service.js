import { client } from "../config/database.js";
import CustomError from "../utils/custom.error.js";

class DatabaseService {
  async createStaff({ first_name, last_name, username, password }) {
    const { rows } = await client.query(
      `insert into staffs (first_name, last_name, username, password)
       values ($1, $2, $3, $4) returning *`,
      [first_name, last_name, username, password]
    );

    return rows[0];
  }

  async createStudent({ first_name, last_name, username, password, group_id }) {
    const { rows } = await client.query(
      `
      insert into students(first_name, last_name, username, password, group_id)
      values ($1, $2, $3, $4, $5) returning *
    `,
      [first_name, last_name, username, password, group_id]
    );

    return rows[0];
  }

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
      console.log("sssss", username);

      return rows[0];
    } catch (err) {
      throw new CustomError(err.message, 500);
    }
  }

  async findStaffRole(createStaff_id) {
    const { rows } = await client.query(
      `select roles.name from staffs join staff_roles sr on sr.staff_id = staffs.id
      join roles on roles.id = sr.role_id where sr.staff_id = $1`,
      [createStaff_id] // but here it is undefined
    );

    if (rows.length === 0) {
      throw new CustomError("No role found for this staff member", 404);
    }

    return rows[0].name;
  }
}

export default DatabaseService;
