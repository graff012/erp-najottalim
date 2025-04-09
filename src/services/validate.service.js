import joi from 'joi';
import CustomError from '../utils/custom.error.js';

class ValidationService {
  async staffValidationLogin(data) {
    try {
      const validate = joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
      });

      await validate.validateAsync(data);
    } catch (err) {
      throw new CustomError(err.message, 400);
    }
  }

  async studentValidationLogin(data) {
    try {
      const validate = joi.object({
        username: joi.string().required(),
        password: joi.string().required(),
      });

      await validate.validateAsync(data);
    } catch (err) {
      throw new CustomError(err.message, 400);
    }
  }
}

export default ValidationService;
