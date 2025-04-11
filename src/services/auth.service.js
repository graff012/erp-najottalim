import CustomError from "../utils/custom.error.js";
import DatabaseService from "./database.service.js";
import JwtService from "./jwt.service.js";
import ValidationService from "./validate.service.js";
import bcrypt from "bcryptjs";

class AuthService {
  constructor() {
    this.validateService = new ValidationService();
    this.dbService = new DatabaseService();
    this.jwtService = new JwtService();
  }

  async registerStaff(data) {
    const { first_name, last_name, username, password } = data;

    if (!first_name || !last_name || !username || !password) {
      throw new CustomError("All fields are required", 401);
    }

    const existedUser = await this.dbService.findOneStaff(username);
    if (existedUser) {
      throw new CustomError("Username already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newStaff = {
      ...data,
      password: hashedPassword,
    };

    const createStaff = await this.dbService.createStaff(newStaff);

    const role = await this.dbService.findStaffRole(createStaff.id);

    const { accessToken, refreshToken } = this.jwtService.generateToken(
      createStaff.id,
      role
    );

    return { createStaff, accessToken, refreshToken };
  }

  async registerStudent(data) {
    const { first_name, last_name, username, password, group_id } = data;

    if (!first_name || !last_name || !username || !password) {
      throw new CustomError("All fields are required", 404);
    }

    const existedUser = await this.dbService.findOneStudent(username);
    if (existedUser) throw new CustomError("Username already exists", 409);

    // hashing the password

    const hashedPassword = await bcrypt.hash(password, 12);

    const studentPayload = {
      ...data,
      password: hashedPassword,
      group_id: group_id || null,
    };

    const createStudent = await this.dbService.createStudent(studentPayload);

    const { accessToken, refreshToken } = this.jwtService.generateStudentToken(
      createStudent.id
    );

    return {
      createStudent,
      accessToken,
      refreshToken,
    };
  }

  async loginStaff({ username, password }) {
    await this.validateService.staffValidationLogin({ username, password });

    const findStaff = await this.dbService.findOneStaff(username);

    if (!findStaff) {
      throw new CustomError("Username or password is incorrect");
    }

    const comparedPassword = await bcrypt.compare(password, findStaff.password);

    if (!comparedPassword) {
      throw new CustomError("Username or password is incorrect");
    }

    const role = await this.dbService.findStaffRole(findStaff.id);
    const { accessToken, refreshToken } = this.jwtService.generateToken(
      findStaff.id,
      role
    );

    return { accessToken, refreshToken };
  }
  async loginStudent({ username, password }) {
    await this.validateService.studentValidationLogin({ username, password });

    const findStudent = await this.dbService.findOneStudent(username);
    if (!findStudent) {
      throw new CustomError("Username or password is incorrect", 404);
    }

    const comparedPassword = await bcrypt.compare(
      password,
      findStudent.password
    );

    console.log("compered password: ", comparedPassword);

    if (!comparedPassword) {
      throw new CustomError("Username or password is incorrect", 404);
    }

    const { accessToken, refreshToken } = this.jwtService.generateStudentToken(
      findStudent.id
    );

    return { accessToken, refreshToken };
  }
}

export default AuthService;
