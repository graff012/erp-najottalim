import CustomError from '../utils/custom.error.js';
import DatabaseService from './database.service.js';
import JwtService from './jwt.service.js';
import ValidationService from './validate.service.js';
import bcrypt from 'bcryptjs';

class AuthService {
  constructor() {
    this.validateService = new ValidationService();
    this.dbService = new DatabaseService();
    this.jwtService = new JwtService();
  }
  async loginStaff({ username, password }) {
    await this.validateService.staffValidationLogin({ username, password });

    const findStaff = await this.dbService.findOneStaff(username);

    if (!findStaff) {
      throw new CustomError('Username or password is incorrect');
    }

    const comparedPassword = await bcrypt.compare(password, findStaff.password);

    if (!comparedPassword) {
      throw new CustomError('Username or password is incorrect');
    }

    const role = await this.dbService.findStaffRole(findStaff.id);
    const { accessToken, refreshToken } = this.jwtService.generateToken(
      findStaff.id,
      role
    );

    return { accessToken, refreshToken };
  }
  async loginStudent() {}
}

export default AuthService;
