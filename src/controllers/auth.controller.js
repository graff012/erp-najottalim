import AuthService from "../services/auth.service.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async registerStaffController(req, res, next) {
    const data = req.body;

    try {
      const staff = await this.authService.registerStaff(data);

      res.status(201).json({ staff });
    } catch (err) {
      next(err);
    }
  }

  async registerStudentController(req, res, next) {
    const data = req.body;

    try {
      const student = await this.authService.registerStudent(data);

      res.status(201).json(student);
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  }

  async loginStaffController(req, res, next) {
    const data = req.body;
    try {
      const { accessToken, refreshToken } = await this.authService.loginStaff(
        data
      );

      res.status(201).json({ accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  }
  async loginStudentController(req, res, next) {
    const data = req.body;

    try {
      const { accessToken, refreshToken } = await this.authService.loginStudent(
        data
      );

      res.status(201).json({ accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
