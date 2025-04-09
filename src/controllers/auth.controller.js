import AuthService from '../services/auth.service.js';

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  async loginStaffController(req, res, next) {
    const data = req.body;
    try {
      const { accessToken, refreshToken } =
        await this.authService.loginStaff(data);

      req.status(201).json({ accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  }
  async loginStudentController(req, res, next) {
    const data = req.body;

    try {
      const { accessToken, refreshToken } =
        await this.authService.loginStudent(data);

      req.status(201).json({ accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
