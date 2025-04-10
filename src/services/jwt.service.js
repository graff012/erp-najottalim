import jwt from 'jsonwebtoken';
import CustomError from '../utils/custom.error.js';

class JwtService {
  #secretKey = process.env.JWT_SECRET_KEY;

  generateToken(user_id, role) {
    const accessToken = jwt.sign(
      { userId: user_id, userRole: role },
      this.#secretKey,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: user_id, userRole: role.name },
      this.#secretKey,
      { expiresIn: '2h' }
    );

    return { accessToken, refreshToken };
  }

  generateStudentToken(user_id) {
    const accessToken = jwt.sign({ userId: user_id }, this.#secretKey, {
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign({ userId: user_id }, this.#secretKey, {
      expiresIn: '3h',
    });

    return { accessToken, refreshToken };
  }

  verifyToken(token) {
    try {
      jwt.verify(token, this.#secretKey);
    } catch (err) {
      throw new CustomError('Token invalid', 400);
    }
  }
}

export default JwtService;
